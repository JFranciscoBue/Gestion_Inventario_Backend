import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
