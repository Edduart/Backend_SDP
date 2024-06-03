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
      return ["Diocese name is required"];
    }

    if (!holder) {
      return ["Holder name is required"];
    }

    //validate 

    return [undefined, new UpdateDioceseDto(id, name, holder)];
  }
}
