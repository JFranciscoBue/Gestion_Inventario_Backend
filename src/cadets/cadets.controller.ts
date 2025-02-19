import { Body, Controller, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { PayloadDataDto } from 'src/dto/payloadData.dto';
import { ValidSalary } from 'src/interceptors/validationSalary.interceptor';

@Controller('cadets')
export class CadetsController {
  constructor(private readonly cadetsService: CadetsService) {}

  @Post()
  async addCadet(@Body() data) {
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
