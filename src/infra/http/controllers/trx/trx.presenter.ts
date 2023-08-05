import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from 'src/domain/model/product';
import { TrxM } from 'src/domain/model/trx';
import { UserM } from 'src/domain/model/user';

export class TrxPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  qty: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  user?: UserM;
  @ApiProperty()
  product?: ProductM;

  constructor(trx: TrxM) {
    this.id = trx.id;
    this.userId = trx.userId;
    this.productId = trx.productId;
    this.qty = trx.qty;
    this.totalPrice = trx.totalPrice;
    this.createdAt = trx.createdAt;
    this.updatedAt = trx.updatedAt;
    this.user = trx.user;
    this.product = trx.product;
  }
}
