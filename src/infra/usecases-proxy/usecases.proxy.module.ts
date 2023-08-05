import { DynamicModule, Module } from '@nestjs/common';
import { GetTrxUseCase } from 'src/usecases/trx/getTrx.usecase';
import { GetTrxsUseCase } from 'src/usecases/trx/getTrxs.usecase';
import { AddTrxUseCase } from 'src/usecases/trx/addTrx.usecase';
import { deleteTrxUseCase } from 'src/usecases/trx/deleteTrx.usecase';
import { AddUserUseCase } from 'src/usecases/user/addUser.usecase';
import { UpdateUserUseCase } from 'src/usecases/user/updateUser.usecase';
import { deleteUserUseCase } from 'src/usecases/user/deleteUser.usecase';
import { AddProductUseCase } from 'src/usecases/product/addProduct.usecase';
import { UpdateProductUseCase } from 'src/usecases/product/updateProduct.usecase';
import { deleteProductUseCase } from 'src/usecases/product/deleteProduct.usecase';

import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { DatabaseModule } from 'src/infra/database/database.module';
import { TypeOrmTrxRepository } from '../database/typeorm/repository/trx.repository';
import { TypeOrmUserRepository } from '../database/typeorm/repository/user.repository';
import { TypeOrmProductRepository } from '../database/typeorm/repository/product.repository';

import { UseCaseProxy } from './usecases.proxy';

@Module({
  imports: [LoggerModule, DatabaseModule],
})
export class UseCasesProxyModule {
  static GET_TRX_USECASES_PROXY = 'getTrxUseCasesProxy';
  static GET_TRXS_USECASES_PROXY = 'getTrxsUseCasesProxy';
  static POST_TRX_USECASES_PROXY = 'postTrxUseCasesProxy';
  static DELETE_TRX_USECASES_PROXY = 'deleteTrxUseCasesProxy';

  static POST_USER_USECASES_PROXY = 'postUserUseCasesProxy';
  static DELETE_USER_USECASES_PROXY = 'deleteUserUseCasesProxy';
  static PUT_USER_USECASES_PROXY = 'putUserUseCasesProxy';

  static POST_PRODUCT_USECASES_PROXY = 'postProductUseCasesProxy';
  static DELETE_PRODUCT_USECASES_PROXY = 'deleteProductUseCasesProxy';
  static PUT_PRODUCT_USECASES_PROXY = 'putProductUseCasesProxy';

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
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) => new UseCaseProxy(new AddUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.PUT_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) => new UseCaseProxy(new UpdateUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.DELETE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) => new UseCaseProxy(new deleteUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(new AddProductUseCase(logger, productRepository)),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(
              new UpdateProductUseCase(logger, productRepository),
            ),
        },
        {
          inject: [LoggerService, TypeOrmProductRepository],
          provide: UseCasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: TypeOrmProductRepository,
          ) =>
            new UseCaseProxy(
              new deleteProductUseCase(logger, productRepository),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.GET_TRX_USECASES_PROXY,
        UseCasesProxyModule.GET_TRXS_USECASES_PROXY,
        UseCasesProxyModule.POST_TRX_USECASES_PROXY,
        UseCasesProxyModule.DELETE_TRX_USECASES_PROXY,
        UseCasesProxyModule.POST_USER_USECASES_PROXY,
        UseCasesProxyModule.PUT_USER_USECASES_PROXY,
        UseCasesProxyModule.DELETE_USER_USECASES_PROXY,
        UseCasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        UseCasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
        UseCasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
      ],
    };
  }
}
