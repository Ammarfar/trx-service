import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';
import { Trx } from '../entities/trx.entity';
import { TrxM } from 'src/domain/model/trx';
import { TrxMapper } from '../mappers/trx.mapper';

@Injectable()
export class TypeOrmTrxRepository implements TrxRepository {
  constructor(
    @InjectRepository(Trx)
    private readonly trxEntityRepository: Repository<Trx>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async insert(trx: TrxM): Promise<TrxM> {
    const trxEntity = TrxMapper.toEntity(trx);
    const result = await this.trxEntityRepository.insert(trxEntity);

    return TrxMapper.toDomain({ ...trx, ...(result.generatedMaps[0] as TrxM) });
  }

  async findAll(): Promise<TrxM[]> {
    const trxsEntity = await this.dataSource
      .getRepository(Trx)
      .createQueryBuilder('trx')
      .leftJoinAndSelect('trx.user', 'user')
      .leftJoinAndSelect('trx.product', 'product')
      .getMany();

    return trxsEntity.map((trx) => TrxMapper.toDomain(trx));
  }

  async findById(id: number): Promise<TrxM> {
    const trxEntity = await this.dataSource
      .getRepository(Trx)
      .createQueryBuilder('trx')
      .leftJoinAndSelect('trx.user', 'user')
      .leftJoinAndSelect('trx.product', 'product')
      .where('trx.id = :id', { id })
      .getOne();

    return TrxMapper.toDomain(trxEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.trxEntityRepository.delete({ id: id });
  }
}
