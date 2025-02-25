import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeAuthDto } from 'src/dto/employeeAuth.dto';
import { Employee } from 'src/employees/Employee.entity';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Cadet } from 'src/cadets/Cadet.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee) private readonly employee: Repository<Employee>,
    @InjectRepository(Cadet) private readonly cadet: Repository<Cadet>,
    private readonly jwtService: JwtService,
  ) {}

  async cadetSign(cadetMail: string): Promise<Object> {
    try {
      const cadetFound = await this.cadet.findOneOrFail({
        where: { email: cadetMail },
      });

      const token = this.jwtService.sign({
        id: cadetFound.id,
        email: cadetFound.email,
        name: cadetFound.name,
      });

      return {
        loggedIn: true,
        token,
      };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('The Cadet Not Exist');
      }
      if (error instanceof QueryFailedError) {
        throw new ConflictException('The Email is invalid');
      }
    }
  }

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
