import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases.proxy.module';
import { TrxController } from './controllers/trx/trx.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [
    UseCasesProxyModule.register(),
    CacheModule.register(),
    ExceptionsModule,
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get('RMQ_URL')}`],
            queue: configService.get('RMQ_USER_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get('RMQ_URL')}`],
            queue: configService.get('RMQ_PRODUCT_QUEUE'),
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TrxController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class HttpModule {}
