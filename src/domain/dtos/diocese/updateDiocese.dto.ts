export class UpdateDioceseDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly holder: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;
    if (this.holder) returnObj.holder = this.holder;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateDioceseDto?] {
    const { id, name, holder } = props;

    if (!id || isNaN(Number(id))) {
      return ["Id must be a number > 0 and integer"];
    }

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
    let name_u = name.toUpperCase();
    let hold_u = holder.toUpperCase();
    //validate 

    return [undefined, new UpdateDioceseDto(id, name_u, hold_u)];
  }
}
