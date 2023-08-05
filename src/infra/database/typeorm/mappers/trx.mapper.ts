import { TrxM } from 'src/domain/model/trx';
import { Trx } from '../entities/trx.entity';

export class TrxMapper {
  private constructor() {
    throw new Error(
      'TypeOrmTrxMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(trx: TrxM): Trx {
    return {
      id: trx.id,
      userId: trx.userId,
      productId: trx.productId,
      qty: trx.qty,
      totalPrice: trx.totalPrice,
      createdAt: trx.createdAt,
      updatedAt: trx.updatedAt,
    };
  }

  public static toDomain(trx: Trx): TrxM {
    const trxM: TrxM = new TrxM();

    trxM.id = trx.id;
    trxM.userId = trx.userId;
    trxM.productId = trx.productId;
    trxM.qty = trx.qty;
    trxM.totalPrice = trx.totalPrice;
    trxM.createdAt = trx.createdAt;
    trxM.updatedAt = trx.updatedAt;
    trxM.user = trx.user;
    trxM.product = trx.product;

    return trxM;
  }
}
