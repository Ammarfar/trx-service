import { TrxM } from 'src/domain/model/trx';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';

export class GetTrxsUseCase {
  constructor(private readonly trxRepository: TrxRepository) {}

  async execute(): Promise<TrxM[]> {
    return await this.trxRepository.findAll();
  }
}
