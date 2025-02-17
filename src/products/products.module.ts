import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Employee } from 'src/employees/Employee.entity';
import { EmployeesService } from 'src/employees/employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Employee])],
  controllers: [ProductsController],
  providers: [ProductsService, EmployeesService],
})
export class ProductsModule {}
