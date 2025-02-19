import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { PayloadDataDto } from 'src/dto/payloadData.dto';
import { ValidSalary } from 'src/interceptors/validationSalary.interceptor';
import { NewCadetDto } from 'src/dto/newCadet.dto';

@Controller('cadets')
export class CadetsController {
  constructor(private readonly cadetsService: CadetsService) {}

  @Get('/all')
  async getAll() {
    return await this.cadetsService.allCadets();
  }

  @Get('/orders/:id')
  async cadetOrders(@Param('id') id: string) {
    return await this.cadetsService.cadetOrders(Number(id));
  }

  @Post()
  async addCadet(@Body() data: NewCadetDto) {
    return await this.cadetsService.addCadet(data);
  }

  @Patch()
  @UseInterceptors(ValidSalary)
  async payCadetSalary(@Body() payloadData: PayloadDataDto) {
    return await this.cadetsService.payCadetSalary(
      payloadData.id,
      payloadData.salary,
    );
  }
}
