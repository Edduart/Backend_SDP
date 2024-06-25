import { PermissionEntity } from "./permission.entity";

export class UserEntity {
  constructor(
    public person_id: string,
    public status: boolean,
    public parish_id: number,
    public password: string,
    public Role_id: number,
    public fecha: Date | null,
    public Permisos: PermissionEntity[]
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { person_id, status, parish_id, password, Role_id, fecha, Permisos } =
      object;

    if (!person_id) throw "Id is required";
    if (!status) throw "Stage ID is required";
    if (!parish_id) throw "Parish ID is required";
    //if (!password) throw "Password is required";
    if (!Role_id) throw "Role ID is required";

    return new UserEntity(
      person_id,
      status,
      parish_id,
      password,
      Role_id,
      fecha,
      Permisos
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
