import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/Employee.entity';
import { Cadet } from 'src/cadets/Cadet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Cadet])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
