import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cadet } from './Cadet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cadet])],
})
export class CadetsModule {}
