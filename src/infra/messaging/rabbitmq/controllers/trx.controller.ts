import { Controller, Inject } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';

import { UseCasesProxyModule } from 'src/infra/usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from 'src/infra/usecases-proxy/usecases.proxy';

@Controller('trxs')
export class TrxController {
  constructor() {}
}
