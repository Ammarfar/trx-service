import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';
import { Trx } from '../entities/trx.entity';
import { TrxM } from 'src/domain/model/trx';
import { TrxMapper } from '../mappers/trx.mapper';

@Injectable()
export class TypeOrmTrxRepository implements TrxRepository {
  constructor(
    @InjectRepository(Trx)
    private readonly trxEntityRepository: Repository<Trx>,
  ) {}

  async insert(trx: TrxM): Promise<TrxM> {
    const trxEntity = TrxMapper.toEntity(trx);
    const result = await this.trxEntityRepository.insert(trxEntity);

    return TrxMapper.toDomain({ ...trx, ...(result.generatedMaps[0] as TrxM) });
  }

  async findAll(): Promise<TrxM[]> {
    const trxsEntity = await this.trxEntityRepository.find();

    return trxsEntity.map((trx) => TrxMapper.toDomain(trx));
  }

  async findById(id: number): Promise<TrxM> {
    const trxEntity = await this.trxEntityRepository.findOneByOrFail({
      id: id,
    });

    return TrxMapper.toDomain(trxEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.trxEntityRepository.delete({ id: id });
  }
}
