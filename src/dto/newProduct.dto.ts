import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Provider } from 'src/providers/Provider.entity';

export class NewProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsString()
  poster: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  providerId: number;
}
