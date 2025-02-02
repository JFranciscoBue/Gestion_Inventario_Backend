import { Module } from '@nestjs/common';
import { CadetsModule } from './cadets/cadets.module';
import { EmployeesModule } from './employees/employees.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [CadetsModule, EmployeesModule, OrdersModule, ProductsModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
