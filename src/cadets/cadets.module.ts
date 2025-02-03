import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cadet } from './Cadet.entity';
import { CadetsController } from './cadets.controller';
import { CadetsService } from './cadets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cadet])],
  controllers: [CadetsController],
  providers: [CadetsService],
})
export class CadetsModule {}
