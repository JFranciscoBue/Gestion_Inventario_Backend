import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { Repository } from 'typeorm';
import { NewProductDto } from 'src/dto/newProduct.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Employee } from 'src/employees/Employee.entity';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly employeeService: EmployeesService,
    @InjectRepository(Product) private readonly product: Repository<Product>,
    @InjectRepository(Employee) private readonly employee: Repository<Employee>,
  ) {}

  async allProducts(): Promise<Object> {
    return await this.product.find({ relations: { employee: true } });
  }

  async productById(id: number): Promise<Product> {
    try {
      return await this.product.findOneOrFail({
        where: { id },
        relations: { employee: true },
      });
    } catch (error) {
      throw new NotFoundException('Product Not Found');
    }
  }

  async employeeProducts(id: number): Promise<Product[] | Object> {
    try {
      const emoployee = await this.employee.findOneOrFail({
        where: {
          id,
        },
        relations: {
          products: true,
        },
      });

      if (emoployee.products.length === 0) {
        return {
          message: 'You not have products yet. Upload One!',
        };
      }

      return emoployee.products;
    } catch (error) {
      throw new NotFoundException('The employee Not Exist.');
    }
  }

  async uploadProduct(data: NewProductDto): Promise<Object> {
    try {
      const instance = plainToInstance(NewProductDto, data);

      const errors = await validate(instance);

      if (errors.length > 0) {
        throw new BadRequestException(
          errors
            .map((err) => Object.values(err.constraints).join(', '))
            .join('; '),
        );
      }

      if (typeof data.providerId !== 'number') {
        throw new BadRequestException('Invalid Provider');
      }

      const provider = await this.employeeService.employeeById(data.providerId);

      const productExist = await this.product.findOne({
        where: { title: data.title },
      });

      if (productExist) {
        throw new BadRequestException('The product already exist');
      }

      const newProduct = this.product.create({
        ...data,
        employee: provider,
      });

      await this.product.save(newProduct);

      return {
        success: true,
        newProduct,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, newData: Partial<Product>): Promise<Object> {
    console.log(id);
    console.log(newData);

    try {
      await this.product.findOneOrFail({ where: { id } });

      await this.product.update(id, newData);

      const updatedProduct = await this.productById(id);

      const { password, ...withOutPassword } = updatedProduct.employee;

      return {
        success: true,
        updatedProduct: {
          ...updatedProduct,
          employee: withOutPassword,
        },
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('The product Not Exist');
    }
  }

  async deleteProduct(id: number): Promise<Object> {
    try {
      const affectedRows = (await this.product.delete(id)).affected;

      if (affectedRows === 0) {
        throw new NotFoundException('The product not exist');
      }

      return {
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
