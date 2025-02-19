import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cadet } from './Cadet.entity';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';

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

  async payCadetSalary(id: number, salary: number) {
    try {
      const payedCadet = await this.cadet.findOneOrFail({ where: { id } });
      const newMoney = (payedCadet.money += salary);
      console.log(newMoney);
      const affectedRows = (await this.cadet.update(id, { money: newMoney }))
        .affected;

      if (affectedRows === 1) {
        return {
          success: true,
          payedCadet,
        };
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Cadet with ID ${id} not found.`);
      }
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Database query failed. Check data types.');
      }
      throw new InternalServerErrorException(
        `Unexpected error: ${error.message}`,
      );
    }
  }
}
