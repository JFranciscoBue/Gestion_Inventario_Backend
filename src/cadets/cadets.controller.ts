import { Body, Controller, Post } from '@nestjs/common';
import { CadetsService } from './cadets.service';

@Controller('cadets')
export class CadetsController {
  constructor(private readonly cadetsService: CadetsService) {}

  @Post()
  async addCadet(@Body() data) {
    return await this.cadetsService.addCadet(data);
  }
}
