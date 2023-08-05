import { ILogger } from 'src/domain/logger/logger.interface';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';

export class deleteTrxUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly trxRepository: TrxRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.trxRepository.deleteById(id);
    this.logger.log('deleteTrxUseCase execute', `Trx ${id} have been deleted`);
  }
}
