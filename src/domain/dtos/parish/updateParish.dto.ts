

export class UpdateParishDto {
  private constructor(
    public readonly id: number,
    public readonly diocese_id: number,
    public readonly name: string,
    public readonly patron: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.diocese_id) returnObj.diocese_id = this.diocese_id;
    if (this.name) returnObj.name = this.name;
    if (this.patron) returnObj.patron = this.patron;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateParishDto?] {
    const { id, diocese_id,name,patron } = props;

    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number"];
    }

    if (!diocese_id || isNaN(Number(diocese_id))) {
      return ["diocese_id must be a valid number"];
    }

    if (!patron) {
      return ["Patron name is required"];
    }
    if (typeof patron !== "string" ) {
      return ["Patron only support characters"];
    }
    if (typeof name !== "string" ) {
      return ["Name only support characters"];
    }
    
    //validate patron

    return [undefined, new UpdateParishDto(id ,diocese_id,name,patron)];
  }
}