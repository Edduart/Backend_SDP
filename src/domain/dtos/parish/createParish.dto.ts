//this in case i'll need to use
export class CreateParishDto {
  private constructor(
    //public readonly id: number,
    public readonly diocese_id: number, //tengo dudas sobre este dato del mer ya que es de la relacion y no entiendo aun esa parte xd
    public readonly name: string,
    public readonly patron: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateParishDto?] {
    const { diocese_id, name, patron } = props;

    //if (!id) return ["ID is required", undefined];
    if (!diocese_id) return ["diocese_id is required", undefined];
    if (!name) return ["Name is required", undefined];
    if (!patron) return ["Patron is required", undefined];

    //new validations
    


    //
    //
    //make more validations
    //
    //

    return [undefined, new CreateParishDto( diocese_id ,name, patron)];
  }
}

