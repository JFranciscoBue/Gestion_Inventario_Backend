import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { PayloadDataDto } from 'src/dto/payloadData.dto';
import { ValidSalary } from 'src/interceptors/validationSalary.interceptor';
import { NewCadetDto } from 'src/dto/newCadet.dto';
import { Cadet } from './Cadet.entity';

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

  @Put('/update/:id')
  async updateCadet(@Param('id') id: string, @Body() data: Partial<Cadet>) {
    return await this.cadetsService.updateCadet(Number(id), data);
  }

  @Delete('/:id')
  async deleteCadet(@Param('id') id: string) {
    return await this.cadetsService.deleteCadet(Number(id));
  }
}
