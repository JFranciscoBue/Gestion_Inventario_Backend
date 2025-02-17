import {
  IsEmail,
  IsString,
  IsInt,
  IsNotEmpty,
  MinLength,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enum/Role.enum';

export class NewEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsInt()
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  marketAdress: string;

  @IsString()
  @IsNotEmpty()
  debitCardNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}
