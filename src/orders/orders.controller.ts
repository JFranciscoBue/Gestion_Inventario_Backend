import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/newOrder.dto';
import { ValidParamsOrderStatusChange } from 'src/interceptors/validationParamsOrderStatus.interceptor';
import { ValidParamRequest } from 'src/interceptors/validationParam.interceptor';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/all')
  async allOrders() {
    return await this.ordersService.allOrders();
  }

  @Get(':id')
  @UseInterceptors(ValidParamRequest)
  async orderById(@Param('id') id: string) {
    return await this.ordersService.orderById(Number(id));
  }

  @Get('/employee_orders/:id')
  @UseInterceptors(ValidParamRequest)
  async employeeOrders(@Param('id') id: string) {
    return await this.ordersService.employeeOrders(Number(id));
  }

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
