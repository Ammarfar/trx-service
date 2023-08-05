import { TrxM } from '../model/trx';

export interface TrxRepository {
  insert(trx: TrxM): Promise<TrxM>;
  findAll(): Promise<TrxM[]>;
  findById(id: number): Promise<TrxM>;
  deleteById(id: number): Promise<void>;
}
