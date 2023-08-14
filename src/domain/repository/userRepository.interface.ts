import { UserM } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  updateById(id: number, user: UserM): Promise<void>;
  deleteById(id: number): Promise<void>;
  findById(id: number): Promise<UserM>;
}
