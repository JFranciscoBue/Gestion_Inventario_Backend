import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/dto/newOrder.dto';
import { Employee } from 'src/employees/Employee.entity';
import { Cadet } from 'src/cadets/Cadet.entity';
import { Product } from 'src/products/Product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly order: Repository<Order>,
    @InjectRepository(Employee) private readonly employee: Repository<Employee>,
    @InjectRepository(Cadet) private readonly cadet: Repository<Cadet>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
  ) {}

  async newOrder(data: CreateOrderDto) {
    try {
      console.log(data);
      const employee = await this.employee.findOneOrFail({
        where: { id: data.employee_id },
      });
      console.log(employee);

      const cadet = await this.cadet.findOneOrFail({
        where: { id: data.cadet_id },
        relations: ['orders'],
      });

      const newOrder = this.order.create({
        ...data,
        products: data.products,
        employee,
        cadet,
      });

      await this.order.save(newOrder);

      cadet.orders.push(newOrder);

      await this.cadet.save(cadet);

      await Promise.all(
        newOrder.products.map(async (prod) => {
          const product = await this.product.findOne({
            where: { id: prod.id },
          });
          console.log(product);

          await this.product.update(prod.id, { stock: (product.stock -= 1) });
        }),
      );

      return {
        success: true,
        newOrder,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Order Cannot generated: ${error.message}`);
    }
  }
}
