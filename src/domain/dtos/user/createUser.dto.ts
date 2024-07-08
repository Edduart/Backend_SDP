import { CreateDegree, CreatePerson } from "../..";

export class CreateUserDto {
  constructor(
    public readonly person: CreatePerson,
    public readonly degree: CreateDegree[] | undefined,
    public parish_id: number,
    public password: string,
    public role: number //public last_login: Date | null
  ) {}
}

/*static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    //const status: boolean = true;
    //const last_login = null;

 const { person_id, parish_id, password, role_id } = props;

    if (!person_id) {
      return ["Dto[err]: Person ID is required"];
    } else if (typeof person_id !== "string") {
      return ["Dto[err]: Person ID must be a string"];
    }

    if (!parish_id) {
      return ["Dto[err]: Parish ID is required"];
    } else if (isNaN(Number(parish_id))) {
      return ["Dto[err]: Parish ID must be a valid ID or number"];
    }

    if (!password) {
      return ["Dto[err]: Password is required"];
    } else if (typeof password !== "string") {
      return ["Dto[err]: Password must be a string"];
    }

    if (!role_id) {
      return ["Dto[err]: Role ID is required"];
    } else if (isNaN(Number(parish_id))) {
      return ["Dto[err]: Role ID must be a valid ID or number"];
    }

    return [
      undefined,
      new CreateUserDto(
        person_id,

        parish_id,
        password,
        role_id

      ),
    ];
  }
}*/
