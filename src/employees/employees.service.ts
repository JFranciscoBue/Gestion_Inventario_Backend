import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewEmployeeDto } from 'src/dto/newEmployee.dto';
import { Employee } from './Employee.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employees: Repository<Employee>,
  ) {}

  async newEmployee(data: NewEmployeeDto): Promise<Object> {
    console.log(data);

    const transformedData = plainToInstance(NewEmployeeDto, data);

    const errors = await validate(transformedData);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((error) =>
          Object.values(error.constraints || {}).join(', '),
        ),
      );
    }

    const existingEmployee = await this.employees.findOne({
      where: [
        { email: data.email },
        { dni: data.dni },
        { username: data.username },
        { marketAdress: data.marketAdress },
        { debitCardNumber: data.debitCardNumber },
      ],
    });

    if (existingEmployee) {
      const duplicateField = Object.keys(existingEmployee).find(
        (key) => existingEmployee[key] === data[key],
      );

      throw new BadRequestException(`${duplicateField} already exists`);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.employees.save({
      ...data,
      password: hashedPassword,
    });

    return {
      message: 'Employee added succesfully',
      employee: {
        name: data.name,
        surname: data.surname,
        dni: data.dni,
      },
    };
  }

  async employeeOrders(id: number): Promise<Object | string> {
    const employeeFound = await this.employees.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!employeeFound) {
      throw new NotFoundException('The employee not exist');
    }

    const orders = employeeFound.orders;

    if (orders.length === 0) {
      return 'You not have any order yet';
    }

    return {
      orders,
    };
  }
}
