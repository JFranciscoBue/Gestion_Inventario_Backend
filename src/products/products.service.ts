import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { Repository } from 'typeorm';
import { NewProductDto } from 'src/dto/newProduct.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly product: Repository<Product>,
  ) {}

  async allProducts(): Promise<Object> {
    return await this.product.find({ relations: { provider: true } });
  }

  async uploadProduct(data: NewProductDto) {
    const instance = plainToInstance(NewProductDto, data);

    const errors = await validate(instance);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors
          .map((err) => Object.values(err.constraints).join(', '))
          .join('; '),
      );
    }
  }
}
