import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/newOrder.dto';
import { ValidParamsOrderStatusChange } from 'src/interceptors/validationParamsOrderStatus.interceptor';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/new')
  async newOrder(@Body() data: CreateOrderDto) {
    return await this.ordersService.newOrder(data);
  }

  @Patch('/changeStatus/:order_id/:status')
  @UseInterceptors(ValidParamsOrderStatusChange)
  async setNewStatus(
    @Param('order_id') id: string,
    @Param('status') status: string,
  ) {
    return await this.ordersService.setNewStatus(Number(id), status);
  }
}
