import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases.proxy.module';
import { TrxController } from './rabbitmq/controllers/trx.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [TrxController],
})
export class MessagingModule {}
