import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infra/common/swagger/response.decorator';

import { UseCasesProxyModule } from '../../../usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from '../../../usecases-proxy/usecases.proxy';
import { GetTrxUseCase } from 'src/usecases/trx/getTrx.usecase';
import { GetTrxsUseCase } from 'src/usecases/trx/getTrxs.usecase';
import { deleteTrxUseCase } from 'src/usecases/trx/deleteTrx.usecase';
import { AddTrxUseCase } from 'src/usecases/trx/addTrx.usecase';

import { TrxPresenter } from './trx.presenter';
import { AddTrxDto } from './trx.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('trxs')
@ApiTags('trx')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TrxPresenter)
export class TrxController {
  constructor(
    @Inject(UseCasesProxyModule.GET_TRX_USECASES_PROXY)
    private readonly getTrxUsecaseProxy: UseCaseProxy<GetTrxUseCase>,
    @Inject(UseCasesProxyModule.GET_TRXS_USECASES_PROXY)
    private readonly getAllTrxUsecaseProxy: UseCaseProxy<GetTrxsUseCase>,
    @Inject(UseCasesProxyModule.DELETE_TRX_USECASES_PROXY)
    private readonly deleteTrxUsecaseProxy: UseCaseProxy<deleteTrxUseCase>,
    @Inject(UseCasesProxyModule.POST_TRX_USECASES_PROXY)
    private readonly addTrxUsecaseProxy: UseCaseProxy<AddTrxUseCase>,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
  ) {
    this.userClient.connect();
    this.productClient.connect();
  }

  @Get('/:id')
  @ApiResponseType(TrxPresenter, false)
  async getTrx(@Param() params: any) {
    const trx = await this.getTrxUsecaseProxy.getInstance().execute(params.id);

    return new TrxPresenter(trx);
  }

  @Get('/')
  @ApiResponseType(TrxPresenter, false)
  async getTrxs() {
    const trxs = await this.getAllTrxUsecaseProxy.getInstance().execute();

    return trxs.map((trx) => new TrxPresenter(trx));
  }

  @Delete('/:id')
  @ApiResponseType(TrxPresenter, false)
  async deleteTrx(@Param() params: any) {
    await this.deleteTrxUsecaseProxy.getInstance().execute(params.id);

    return 'success';
  }

  @Post('/')
  @ApiResponseType(TrxPresenter, false)
  async addTrx(@Body() addTrxDto: AddTrxDto) {
    const trxCreated = await this.addTrxUsecaseProxy
      .getInstance()
      .execute(addTrxDto);

    this.userClient.emit('trx.created', trxCreated);
    this.productClient.emit('trx.created', trxCreated);

    return new TrxPresenter(trxCreated);
  }
}
