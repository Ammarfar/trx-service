import { Controller, Inject } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';

import { UseCasesProxyModule } from 'src/infra/usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from 'src/infra/usecases-proxy/usecases.proxy';
import { AddUserUseCase } from 'src/usecases/user/addUser.usecase';
import { UpdateUserUseCase } from 'src/usecases/user/updateUser.usecase';
import { deleteUserUseCase } from 'src/usecases/user/deleteUser.usecase';
import { AddProductUseCase } from 'src/usecases/product/addProduct.usecase';
import { UpdateProductUseCase } from 'src/usecases/product/updateProduct.usecase';
import { deleteProductUseCase } from 'src/usecases/product/deleteProduct.usecase';

@Controller('trxs')
export class TrxController {
  constructor(
    @Inject(UseCasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCase>,
    @Inject(UseCasesProxyModule.PUT_USER_USECASES_PROXY)
    private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UseCasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<deleteUserUseCase>,
    @Inject(UseCasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductUseCase>,
    @Inject(UseCasesProxyModule.PUT_PRODUCT_USECASES_PROXY)
    private readonly updateProductUsecaseProxy: UseCaseProxy<UpdateProductUseCase>,
    @Inject(UseCasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    private readonly deleteProductUsecaseProxy: UseCaseProxy<deleteProductUseCase>,
  ) {}

  @EventPattern('user.created')
  async handleUserCreatedEvent(@Payload() payload) {
    await this.addUserUsecaseProxy.getInstance().execute(payload);
  }

  @EventPattern('user.updated')
  async handleUserUpdatedEvent(@Payload() payload) {
    const { userId, request } = payload;
    await this.updateUserUsecaseProxy.getInstance().execute(userId, request);
  }

  @EventPattern('user.deleted')
  async handleUserDeletedEvent(@Payload() payload) {
    const { userId } = payload;
    await this.deleteUserUsecaseProxy.getInstance().execute(userId);
  }

  @EventPattern('product.created')
  async handleProductCreatedEvent(@Payload() payload) {
    await this.addProductUsecaseProxy.getInstance().execute(payload);
  }

  @EventPattern('product.updated')
  async handleProductUpdatedEvent(@Payload() payload) {
    const { productId, request } = payload;
    await this.updateProductUsecaseProxy
      .getInstance()
      .execute(productId, request);
  }

  @EventPattern('product.deleted')
  async handleProductDeletedEvent(@Payload() payload) {
    const { productId } = payload;
    await this.deleteProductUsecaseProxy.getInstance().execute(productId);
  }
}
