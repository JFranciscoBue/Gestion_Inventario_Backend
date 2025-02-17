import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { NewProductDto } from 'src/dto/newProduct.dto';
import { Product } from './Product.entity';
import { ValidateRequestBodyInterceptor } from 'src/interceptors/validationBody.interceptor';
import { ValidParamRequest } from 'src/interceptors/validationParam.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/all')
  async allProducts(): Promise<Object> {
    return await this.productsService.allProducts();
  }

  @Get('/:id')
  async productById(@Param('id') id: string) {
    return await this.productsService.productById(Number(id));
  }

  @Get('/employee_products/:id')
  @UseInterceptors(ValidParamRequest)
  async employeeProducts(@Param('id') id: string) {
    return await this.productsService.employeeProducts(Number(id));
  }

  @Post('/upload')
  async uploadProduct(@Body() data: NewProductDto) {
    return await this.productsService.uploadProduct(data);
  }

  @Patch('/update/:id')
  @UseInterceptors(ValidParamRequest, ValidateRequestBodyInterceptor)
  async updateProduct(
    @Body() newData: Partial<Product>,
    @Param('id') id: string,
  ) {
    return await this.productsService.updateProduct(Number(id), newData);
  }

  @Delete('/delete/:id')
  @UseInterceptors(ValidParamRequest)
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(Number(id));
  }
}
