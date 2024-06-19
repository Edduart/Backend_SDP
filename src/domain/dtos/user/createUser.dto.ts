export class CreateUserDto {
  constructor(
    public person_id: string,
    public status: number,
    public password: string,
    public role_id: number,
    public parish_id: number
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const { person_id, status, password, role_id, parish_id } = props;

    if (!person_id) {
      return ["Name is required"];
    } else if (typeof person_id !== "string") {
      return ["Name must be a string"];
    }

    if (!status) {
      return ["Status ID is required"];
    } else if (isNaN(Number(status))) {
      return ["Status ID must be a valid ID or number"];
    }

    if (!password) {
      return ["Password is required"];
    } else if (typeof password !== "string") {
      return ["Password must be a string"];
    }

    if (!role_id) {
      return ["Password is required"];
    } else if (typeof password !== "string") {
      return ["Password must be a string"];
    }

    if (!parish_id) {
      return ["Status ID is required"];
    } else if (isNaN(Number(parish_id))) {
      return ["Status ID must be a valid ID or number"];
    }

    return [
      undefined,
      new CreateUserDto(person_id, status, password, role_id, parish_id),
    ];
  }
}
