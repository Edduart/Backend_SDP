import { prisma } from "../../data/postgres";
import { UserDataSource, UserEntity } from "../../domain";

export class UserDataSourceImple implements UserDataSource {
  async getAll(): Promise<UserEntity[]> {
    const getUsers = await prisma.user.findMany();
    return getUsers.map((users) => UserEntity.fromObject(users));
  }
}
