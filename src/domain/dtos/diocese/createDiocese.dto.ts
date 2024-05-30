
export class CreateDiocese {

  private constructor(

    public readonly id: number,
    public readonly name: string,
    public readonly holder: string

  ) {}

  static create(props: { [key: string]: any }): [string?, CreateDiocese?] {
    const { id, name, holder } = props;

    if (!id) return ["ID is required", undefined];
    if (!name) return ["Name is required", undefined];
    if (!holder) return ["Holder is required", undefined];

    //
    //
    //make more validations
    //
    //

    return [undefined, new CreateDiocese(id, name, holder)];
  }
}

