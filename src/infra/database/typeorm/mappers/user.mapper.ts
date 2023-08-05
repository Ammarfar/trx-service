import { UserM } from 'src/domain/model/user';
import { User } from '../entities/user.entity';

export class UserMapper {
  private constructor() {
    throw new Error(
      'TypeOrmUserMapper is a static class and should not be instantiated',
    );
  }

  public static toEntity(user: UserM): User {
    return {
      id: user.id,
      name: user.name,
    };
  }

  public static toDomain(user: User): UserM {
    const userM: UserM = new UserM();

    userM.id = user.id;
    userM.name = user.name;

    return userM;
  }
}
