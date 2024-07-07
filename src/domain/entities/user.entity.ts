import { ParishEntity } from "./parish.entity";
import { RoleEntity } from "./role.entity";

export class UserEntity {
  constructor(
    public person_id: string,
    public status: boolean,
    public parish: ParishEntity,
    public password: string,
    public role: RoleEntity,
    public last_login: Date | null
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { person_id, status, parish, password, role, fecha } = object;

    const parish_obj = ParishEntity.fromObject(parish);
    const role_obj = RoleEntity.fromdb(role);

    if (!person_id) throw "Ent[Err]: Id is required";
    if (!status) throw "Ent[Err]: Stage ID is required";
    //if (!parish_id) throw "Ent[Err]: Parish ID is required";
    if (!password) throw "Ent[Err]: Password is required";
    //if (!role_id) throw "Ent[Err]: Role ID is required";

    return new UserEntity(
      person_id,
      status,
      parish_obj,
      password,
      role_obj,
      fecha
    );
  }

  public static FromDbAccess(object: { [key: string]: any }) {
    const { person_id, status, parish, password, role, fecha } = object;
    const parish_obj = ParishEntity.fromObject(parish);
    const role_obj = RoleEntity.fromdb(role);
    const date_obj = new Date(fecha);
    return new UserEntity(
      person_id,
      status,
      parish_obj,
      password,
      role_obj,
      date_obj
    );
  }
}
