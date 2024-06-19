import { prisma } from "../../data/postgres";
import { CreateUserDto, UserDataSource, UserEntity } from "../../domain";

export class UserDataSourceImple implements UserDataSource {

  async create(createDto: CreateUserDto): Promise<UserEntity> {
    const createUser = await prisma.user.create({
      data: createDto,
    });
    return UserEntity.fromObject(createUser);
  }
  async getAll(): Promise<UserEntity[]> {
    const getUsers = await prisma.user.findMany();
    return getUsers.map((users) => UserEntity.fromObject(users));
  }
}
