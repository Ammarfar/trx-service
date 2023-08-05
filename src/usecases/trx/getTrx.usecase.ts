import { TrxM } from 'src/domain/model/trx';
import { TrxRepository } from 'src/domain/repository/trxRepository.interface';

export class GetTrxUseCase {
  constructor(private readonly trxRepository: TrxRepository) {}

  async execute(id: number): Promise<TrxM> {
    return await this.trxRepository.findById(id);
  }
}
