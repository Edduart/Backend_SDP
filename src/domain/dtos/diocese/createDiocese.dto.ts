//this in case i'll need to use
export class CreateDioceseDto {
  private constructor(
    //public readonly id: number,
    public readonly name: string,
    public readonly holder: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateDioceseDto?] {
    const {  name, holder } = props;
    if (!name) {
      return ["Name is required"];
    } else if (typeof name !== "string") {
      return ["Name must be a string"];
    }
    if (!holder) {
      return ["Holder is required"];
    } else if (typeof holder !== "string") {
      return ["Holder must be a string"];
    }

    const name_u = name.toUpperCase();
    const holder_u = holder.toUpperCase();
    return [undefined, new CreateDioceseDto(name_u, holder_u)];
  }
}

