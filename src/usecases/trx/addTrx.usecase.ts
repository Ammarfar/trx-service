import { TrxM } from '../../domain/model/trx';
import { ILogger } from '../../domain/logger/logger.interface';
import { TrxRepository } from '../../domain/repository/trxRepository.interface';
import { UserRepository } from '../../domain/repository/userRepository.interface';
import { ProductRepository } from '../../domain/repository/productRepository.interface';
import { UserM } from '../../domain/model/user';
import { ProductM } from '../../domain/model/product';

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
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
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

  async getUser(id: number): Promise<UserM> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    return user;
  }

  async getProduct(id: number): Promise<ProductM> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      return null;
    }

    return product;
  }

  isBalanceEnought(balance: number, totalPrice: number): boolean {
    return balance > totalPrice;
  }

  isStockEnought(stock: number, qty: number): boolean {
    return stock > qty;
  }
}
