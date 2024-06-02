

export class UpdateDioceseDto {
  private constructor(
    public readonly id: number,
    //public readonly name: string,
    public readonly holder: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.holder) returnObj.holder = this.holder;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateDioceseDto?] {
    const { id, holder } = props;

    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number"];
    }

    if (!holder) {
      return ["Holder name is required"];
    }
    
    //validate holder

    return [undefined, new UpdateDioceseDto(id ,holder)];
  }
}