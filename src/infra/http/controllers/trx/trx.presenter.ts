import { ApiProperty } from '@nestjs/swagger';
import { TrxM } from 'src/domain/model/trx';

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

  constructor(trx: TrxM) {
    this.id = trx.id;
    this.userId = trx.userId;
    this.productId = trx.productId;
    this.qty = trx.qty;
    this.totalPrice = trx.totalPrice;
    this.createdAt = trx.createdAt;
    this.updatedAt = trx.updatedAt;
  }
}
