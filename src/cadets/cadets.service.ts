import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cadet } from './Cadet.entity';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { NewCadetDto } from 'src/dto/newCadet.dto';

@Injectable()
export class CadetsService {
  constructor(
    @InjectRepository(Cadet) private readonly cadet: Repository<Cadet>,
  ) {}

  async allCadets() {
    return await this.cadet.find();
  }

  async addCadet(data: NewCadetDto) {
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

  async cadetOrders(id: number) {
    try {
      const cadetFound = await this.cadet.findOneOrFail({
        where: { id },
        relations: { orders: true },
      });

      const orders = cadetFound.orders;
      console.log(orders);

      if (orders.length === 0) {
        return 'This Cadet Not have Orders Pending Yet. Assign One';
      }

      return {
        orders,
      };
    } catch (error) {
      throw new NotFoundException('The Cadet Not Exist');
    }
  }

  async updateCadet(id: number, data: Partial<Cadet>): Promise<Cadet> {
    await this.cadet.update(id, data);

    const updatedCadet = await this.cadet.findOne({ where: { id } });

    return updatedCadet;
  }

  async deleteCadet(id: number): Promise<Object> {
    const affectedRows = (await this.cadet.delete(id)).affected;

    if (affectedRows === 0) {
      throw new ConflictException('Cannot Delete this Cadet');
    }

    return {
      success: true,
      message: 'Cadet Deleted Successfully',
    };
  }
}
