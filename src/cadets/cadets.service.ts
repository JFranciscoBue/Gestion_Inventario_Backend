import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cadet } from './Cadet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CadetsService {
  constructor(
    @InjectRepository(Cadet) private readonly cadet: Repository<Cadet>,
  ) {}

  async addCadet(data) {
    const newCadet = this.cadet.create(data);
    await this.cadet.save(newCadet);

    return newCadet;
  }
}
