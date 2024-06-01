//this in case i'll need to use
export class CreateDioceseDto {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly holder: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateDioceseDto?] {
    const { id, name, holder } = props;

    if (!id) return ["ID is required", undefined];
    if (!name) return ["Name is required", undefined];
    if (!holder) return ["Holder is required", undefined];

    //
    //
    //make more validations
    //
    //

    return [undefined, new CreateDioceseDto(id, name, holder)];
  }
}

