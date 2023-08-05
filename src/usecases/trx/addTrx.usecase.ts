import { TrxM } from 'src/domain/model/trx';
import { ILogger } from '../../domain/logger/logger.interface';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';

export interface addTrxUseCaseRequest {
  userId: number;
  productId: number;
  qty: number;
  totalPrice: number;
}

export class AddTrxUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly trxRepository: TrxRepository,
  ) {}

  async execute(request: addTrxUseCaseRequest): Promise<TrxM> {
    const trx = new TrxM();
    trx.userId = request.userId;
    trx.productId = request.productId;
    trx.qty = request.qty;
    trx.totalPrice = request.totalPrice;

    const result = await this.trxRepository.insert(trx);
    this.logger.log('AddTrxUseCase execute', 'New trx have been Added');

    return result;
  }
}
