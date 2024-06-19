export class UserEntity {
  constructor(
    public person_id: string,
    public status: number,
    public parish_id: number,
    public password: string,
    public role_id: number,
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {

    const { person_id, status, parish_id, password, role_id } = object;

    if (!person_id) throw "Id is required";
    if (!status) throw "Stage ID is required";
    if (!parish_id) throw "Parish ID is required";
    if (!password) throw "Password is required";
    if (!role_id) throw "Role ID is required";

    return new UserEntity(person_id, status, parish_id, password, role_id);
  }
}
