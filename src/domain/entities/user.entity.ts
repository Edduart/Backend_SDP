import { PermissionEntity } from "./permission.entity";

export class UserEntity {
  constructor(
    public person_id: string,
    public status: boolean,
    public parish_id: number,
    public password: string,
    public role_id: number,
    public last_login: Date | null,
    public Permisos: PermissionEntity[]
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { person_id, status, parish_id, password, role_id, fecha, permisos } =
      object;

    if (!person_id) throw "Ent[Err]: Id is required";
    if (!status) throw "Ent[Err]: Stage ID is required";
    if (!parish_id) throw "Ent[Err]: Parish ID is required";
    if (!password) throw "Ent[Err]: Password is required";
    if (!role_id) throw "Ent[Err]: Role ID is required";

    return new UserEntity(
      person_id,
      status,
      parish_id,
      password,
      role_id,
      fecha,
      permisos
    );
  }
}

/*export class UserEntity {
  constructor(
    public person_id: string,
    public Permisos: PermissionEntity[],
    public password: string | null,
    public status: boolean,
    public fecha: Date | null
  ) {}
  public static FromDbAccess(object: { [key: string]: any }) {
    const { person_id, Role_id, status, dat } = object;

    return new UserEntity(person_id, Role_id, null, status, dat);
  }
}*/
