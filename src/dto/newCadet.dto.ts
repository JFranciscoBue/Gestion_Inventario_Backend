import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class NewCadetDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  surname: string;
}
