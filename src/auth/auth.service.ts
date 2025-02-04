import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeAuthDto } from 'src/dto/employeeAuth.dto';
import { Employee } from 'src/employees/Employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee) private readonly employee: Repository<Employee>,
    private readonly jwtService: JwtService,
  ) {}

  async employeeSign(data: EmployeeAuthDto): Promise<Object> {
    const dtoInstance = plainToInstance(EmployeeAuthDto, data);

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors
          .map((error) => Object.values(error.constraints || {}).join(', '))
          .join(' | '),
      );
    }

    const employee = await this.employee.findOne({
      where: { username: data.username, dni: data.dni },
    });

    if (!employee) {
      throw new NotFoundException('Invalid Credentials');
    }

    const validPassword = await bcrypt.compare(
      data.password,
      employee.password,
    );

    if (!validPassword) {
      throw new BadRequestException('Invalid Credentials');
    }

    const token = this.jwtService.sign({
      email: employee.email,
      username: employee.username,
    });

    return {
      message: 'Logged in',
      token,
    };
  }
}
