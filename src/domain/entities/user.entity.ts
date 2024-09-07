import { ParishEntity } from "./parish.entity";
import { RoleEntity } from "./role.entity";
export class UserEntity {
  constructor(
    public person_id: string,
    public status: boolean,
    public password: string | null,
    public role: RoleEntity,
    public fecha: Date | null,
    public forename: string,
    public surname: string,
    public profile_picture: string | null,
    public parish?: ParishEntity,
  ) {}
  public static FromDbAccess(object: { [key: string]: any }) {
    const { person_id, status, parish, password, role, fecha, forename,surname, profile_picture} = object;
    const parish_obj = ParishEntity.fromObject(parish);
    const role_obj = RoleEntity.fromdb(role);
    const date_obj = new Date(fecha);
    return new UserEntity(
      person_id,
      status,
      password,
      role_obj,
      date_obj, forename,surname, profile_picture, parish_obj
    );
  }
}