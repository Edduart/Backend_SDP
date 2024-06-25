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
  async ChangePassword(data: Login): Promise<String> {
    const actu = await prisma.user.update({
      where: {
        person_id: data.person_id,
      },
      data: {
        password: data.password,
      },
    });
    return actu.person_id;
  }
  async Login(data: Login): Promise<UserEntity> {
    const Usuario_db = await prisma.user.findMany({
      where: {
        AND: [{ person_id: data.person_id }, { status: true }],
      },
      select: {
        person_id: true,
        password: true,
        status: true,
        LastIn: true,
        role: {
          select: {
            id: true,
            role_permission: {
              select: {
                permission: {
                  select: {
                    id: true,
                    name: true,
                    table: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const resultado: UserEntity[] = Usuario_db.map((usuario) => {
      const Permisos: PermissionEntity[] = usuario.role.role_permission.map(
        (permiso_vuelta) => {
          return PermissionEntity.fromdb({
            id: permiso_vuelta.permission.id,
            name: permiso_vuelta.permission.name,
            type: permiso_vuelta.permission.type,
            table: permiso_vuelta.permission.table,
          });
        }
      );
      return new UserEntity(
        usuario.person_id,
        Permisos,
        usuario.password,
        true,
        usuario.LastIn
      );
    });
    return resultado[0];
  }
}

export async function ActualizarFecha(id: string) {
  const fecha = new Date();
  const actualizacion = await prisma.user.update({
    where: {
      person_id: id,
    },
    data: {
      LastIn: fecha,
    },
  });
}


