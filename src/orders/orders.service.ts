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
import { Status } from 'src/enum/Status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly order: Repository<Order>,
    @InjectRepository(Employee) private readonly employee: Repository<Employee>,
    @InjectRepository(Cadet) private readonly cadet: Repository<Cadet>,
    @InjectRepository(Product) private readonly product: Repository<Product>,
  ) {}

  async allOrders() {
    return await this.order.find();
  }

  async orderById(id: number) {
    try {
      return await this.order.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('The Order Not Exist');
    }
  }

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

  async setNewStatus(id: number, status: string) {
    try {
      console.log(status);
      const orderFound = await this.order.findOneOrFail({ where: { id } });
      console.log(orderFound);

      if (orderFound.status === status) {
        return 'Status already setted';
      }

      await this.order.update(id, { status: Status[status] });

      return {
        success: true,
        message: `Status of the Order has been changed Succesfully. The new Status is: ${status}`,
      };
    } catch (error) {
      throw new ConflictException(`Cannot Set the New Status. Try Again`);
    }
  }
}
