

export class UpdateParishDto {
  private constructor(
    public readonly id: number,
    //public readonly name: string,
    public readonly patron: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.patron) returnObj.patron = this.patron;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateParishDto?] {
    const { id, patron } = props;

    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number"];
    }

    if (!patron) {
      return ["Patron name is required"];
    }
    
    //validate patron

    return [undefined, new UpdateParishDto(id ,patron)];
  }
}