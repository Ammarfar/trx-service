import { DynamicModule, Module } from '@nestjs/common';
import { GetTrxUseCase } from 'src/usecases/trx/getTrx.usecase';
import { GetTrxsUseCase } from 'src/usecases/trx/getTrxs.usecase';
import { AddTrxUseCase } from 'src/usecases/trx/addTrx.usecase';
import { deleteTrxUseCase } from 'src/usecases/trx/deleteTrx.usecase';

import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { DatabaseModule } from 'src/infra/database/database.module';
import { TypeOrmTrxRepository } from '../database/typeorm/repository/trx.repository';

import { UseCaseProxy } from './usecases.proxy';

@Module({
  imports: [LoggerModule, DatabaseModule],
})
export class UseCasesProxyModule {
  static GET_TRX_USECASES_PROXY = 'getTrxUseCasesProxy';
  static GET_TRXS_USECASES_PROXY = 'getTrxsUseCasesProxy';
  static POST_TRX_USECASES_PROXY = 'postTrxUseCasesProxy';
  static DELETE_TRX_USECASES_PROXY = 'deleteTrxUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [TypeOrmTrxRepository],
          provide: UseCasesProxyModule.GET_TRX_USECASES_PROXY,
          useFactory: (trxRepository: TypeOrmTrxRepository) =>
            new UseCaseProxy(new GetTrxUseCase(trxRepository)),
        },
        {
          inject: [TypeOrmTrxRepository],
          provide: UseCasesProxyModule.GET_TRXS_USECASES_PROXY,
          useFactory: (trxRepository: TypeOrmTrxRepository) =>
            new UseCaseProxy(new GetTrxsUseCase(trxRepository)),
        },
        {
          inject: [LoggerService, TypeOrmTrxRepository],
          provide: UseCasesProxyModule.POST_TRX_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            trxRepository: TypeOrmTrxRepository,
          ) => new UseCaseProxy(new AddTrxUseCase(logger, trxRepository)),
        },
        {
          inject: [LoggerService, TypeOrmTrxRepository],
          provide: UseCasesProxyModule.DELETE_TRX_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            trxRepository: TypeOrmTrxRepository,
          ) => new UseCaseProxy(new deleteTrxUseCase(logger, trxRepository)),
        },
      ],
      exports: [
        UseCasesProxyModule.GET_TRX_USECASES_PROXY,
        UseCasesProxyModule.GET_TRXS_USECASES_PROXY,
        UseCasesProxyModule.POST_TRX_USECASES_PROXY,
        UseCasesProxyModule.DELETE_TRX_USECASES_PROXY,
      ],
    };
  }
}
