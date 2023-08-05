import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trx } from './typeorm/entities/trx.entity';
import { TypeOrmTrxRepository } from './typeorm/repository/trx.repository';
import { TypeOrmConfigModule } from './typeorm/config.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Trx])],
  providers: [TypeOrmTrxRepository],
  exports: [TypeOrmTrxRepository],
})
export class DatabaseModule {}
