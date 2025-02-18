import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product } from 'src/products/Product.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Please insert a valid address' })
  @IsString()
  deliveryAdress: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'Add at least one product' })
  products: Product[];

  @IsNotEmpty()
  @IsInt()
  employee_id: number;

  @IsNotEmpty()
  @IsInt()
  cadet_id: number;
}
