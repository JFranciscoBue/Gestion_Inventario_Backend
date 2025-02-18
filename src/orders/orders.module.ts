import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Employee } from 'src/employees/Employee.entity';
import { Cadet } from 'src/cadets/Cadet.entity';
import { Product } from 'src/products/Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Employee, Cadet, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
