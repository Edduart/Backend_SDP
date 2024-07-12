import { filterNullValues } from "../../presentation/utils/FilterNullObject";
import { prisma } from "../../data/postgres";
import {
  CreateUserDto,
  Login,
  PermissionEntity,
  UserDataSource,
  UserEntity,
  RoleEntity,
} from "../../domain";

export class UserDataSourceImplementation implements UserDataSource {
  async getById(id: string): Promise<object> {
    const userById = await prisma.user.findUnique({
      where: { person_id: id },
      select: {
        person: { select: { id: true, forename: true, surname: true } },
        seminarian: {
          select: { status: true },
        },
        professor: {
          select: {
            status_id: true,
            instructor: { select: { status: true, instructor_position: true } },
          },
        },
      },
    });
    if (userById == null) throw ("No se encontraron coincidencias!")
    return filterNullValues(userById);
  }
  async getByType(type: string): Promise<object> {
    if (type === "professor" || type === "seminarian") {
      const userByType = await prisma.user.findMany({
        where: {
          [type]: { isNot: null },
        },
        select: {
          person: { select: { id: true, forename: true, surname: true } },
          seminarian: {
            select: { status: true },
          },
          professor: {
            select: {
              status_id: true,
              instructor: {
                select: { status: true, instructor_position: true },
              },
            },
          },
        },
      });
      return userByType.map(filterNullValues);
    } else {
      throw "Debe enviar un tipo de usuario valido!";
    }
  }
  async getAll(): Promise<object> {
    const users = await prisma.user.findMany({
      select: {
        person: { select: { id: true, forename: true, surname: true } },
        seminarian: {
          select: { status: true },
        },
        professor: {
          select: {
            status_id: true,
            instructor: { select: { status: true, instructor_position: true } },
          },
        },
      },
    });

    return users.map(filterNullValues);
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
    //get the user
    const Usuario_db = await prisma.user.findMany({
      where: {
        AND: [{ person_id: data.person_id }, { status: true }],
      },
      include: {
        role: {
          include: {
            role_permission: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    const resultado: UserEntity[] = Usuario_db.map((usuario) => {
      const permissions: PermissionEntity[] = usuario.role.role_permission.map(
        (permission_actual) => {
          return PermissionEntity.fromdb({
            id: permission_actual.permission.id,
            name: permission_actual.permission.name,
            type: permission_actual.permission.type,
            table: permission_actual.permission.table,
          });
        }
      );
      const role = RoleEntity.fromdb({
        id: usuario.role.id,
        name: usuario.role.name,
        description: usuario.role.description,
        premissions: permissions,
      });
      return new UserEntity(
        usuario.person_id,
        true,
        usuario.password,
        role,
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
