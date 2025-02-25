import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewEmployeeDto } from 'src/dto/newEmployee.dto';
import { Employee } from './Employee.entity';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Role } from 'src/enum/Role.enum';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employees: Repository<Employee>,
  ) {}

  async allEmployees() {
    return await this.employees.find();
  }

  async employeeById(id: number) {
    try {
      return await this.employees.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('The employee Not Exist');
    }
  }

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
    try {
      const employeeFound = await this.employees.findOneOrFail({
        where: { id },
        relations: { orders: { products: true } },
      });
      const employeeOrders = employeeFound.orders;

      if (employeeOrders.length === 0) {
        return 'You not have Orders Yet.';
      }

      const orderProducts = employeeOrders
        .map((element) => element.products)
        .map((element) => element.map((prod) => prod))
        .map((qsy) => qsy);

      return {
        employeeOrders,
        products: orderProducts.flat(),
      };
    } catch (error) {
      throw new NotFoundException('The employee Not Exist');
    }
  }

  async getAllProviders(): Promise<Employee[]> {
    try {
      const providers = await this.employees.find({
        where: { role: Role.PROVIDER },
      });

      return providers;
    } catch (error) {
      throw error;
    }
  }

  async payEmployeeSalary(id: number, salary: number): Promise<Object> {
    try {
      const employeeFound = await this.employees.findOneOrFail({
        where: { id },
      });

      const newMoney = (employeeFound.money += salary);

      const affectedRows = (
        await this.employees.update(id, { money: newMoney })
      ).affected;

      if (affectedRows === 1) {
        const { password, ...withOutPassword } = employeeFound;

        return {
          sucess: true,
          withOutPassword,
        };
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Database query failed. Check data types.');
      }
      throw new InternalServerErrorException(
        `Unexpected error: ${error.message}`,
      );
    }
  }

  async updateEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    const affectedRows = (await this.employees.update(id, data)).affected;

    if (affectedRows === 0) {
      throw new ConflictException('Cannot Update the Info of this Employee');
    }

    const updatedEmployee = await this.employeeById(id);

    return updatedEmployee;
  }

  async deleteEmployee(id: number): Promise<Employee> {
    try {
      const employeeFound = await this.employees.findOneOrFail({
        where: { id },
      });

      await this.employees.delete(id);

      return employeeFound;
    } catch (error) {
      throw new NotFoundException('The Employee Not Exist');
    }
  }
}
