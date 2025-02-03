import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './Employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
})
export class EmployeesModule {}
