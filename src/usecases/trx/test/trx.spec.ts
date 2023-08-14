import { ILogger } from 'src/domain/logger/logger.interface';
import { AddTrxUseCase } from '../addTrx.usecase';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserRepository } from 'src/domain/repository/userRepository.interface';
import { ProductRepository } from 'src/domain/repository/productRepository.interface';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';
import { TrxM } from 'src/domain/model/trx';

describe('uses_cases/trx', () => {
  let addTrxUseCases: AddTrxUseCase;
  let logger: ILogger;
  let exception: IException;
  let trxRepo: TrxRepository;
  let userRepo: UserRepository;
  let productRepo: ProductRepository;

  beforeEach(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    exception = {} as IException;

    userRepo = {} as UserRepository;
    userRepo.findById = jest.fn();

    productRepo = {} as ProductRepository;
    productRepo.findById = jest.fn();

    trxRepo = {} as TrxRepository;
    trxRepo.insert = jest.fn();

    addTrxUseCases = new AddTrxUseCase(logger, trxRepo, userRepo, productRepo);
  });

  describe('creating trx', () => {
    it('should return null because user not found', async () => {
      (userRepo.findById as jest.Mock).mockReturnValue(Promise.resolve(null));

      expect(await addTrxUseCases.getUser(1)).toEqual(null);
    });

    it('should return null because product not found', async () => {
      (productRepo.findById as jest.Mock).mockReturnValue(
        Promise.resolve(null),
      );

      expect(await addTrxUseCases.getProduct(1)).toEqual(null);
    });

    it('should return trx', async () => {
      const trx: TrxM = {
        id: 1,
        userId: 1,
        productId: 1,
        qty: 10,
        totalPrice: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (trxRepo.insert as jest.Mock).mockReturnValue(Promise.resolve(trx));

      expect(
        await addTrxUseCases.execute({
          userId: 1,
          productId: 1,
          qty: 10,
          totalPrice: 1000,
        }),
      ).toEqual(trx);
    });
  });
});
