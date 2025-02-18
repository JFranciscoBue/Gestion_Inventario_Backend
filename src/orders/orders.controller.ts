import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/newOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/new')
  async newOrder(@Body() data: CreateOrderDto) {
    return await this.ordersService.newOrder(data);
  }
}
