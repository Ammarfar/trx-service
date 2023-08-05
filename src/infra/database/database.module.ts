import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trx } from './typeorm/entities/trx.entity';
import { TypeOrmTrxRepository } from './typeorm/repository/trx.repository';
import { TypeOrmConfigModule } from './typeorm/config.module';
import { TypeOrmUserRepository } from './typeorm/repository/user.repository';
import { TypeOrmProductRepository } from './typeorm/repository/product.repository';
import { User } from './typeorm/entities/user.entity';
import { Product } from './typeorm/entities/product.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Trx, User, Product]),
  ],
  providers: [
    TypeOrmTrxRepository,
    TypeOrmUserRepository,
    TypeOrmProductRepository,
  ],
  exports: [
    TypeOrmTrxRepository,
    TypeOrmUserRepository,
    TypeOrmProductRepository,
  ],
})
export class DatabaseModule {}
