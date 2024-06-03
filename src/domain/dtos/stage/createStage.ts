//this in case i'll need to use
export class CreateStageDto {
  private constructor(
    public readonly id: number,
    public readonly description: string,
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateStageDto?] {
    const { id, description } = props;

    if (!id) return ["ID is required", undefined];
    if (!description) return ["Name is required", undefined];

    //
    //
    //make more validations
    //
    //

    return [undefined, new CreateStageDto(id, description )];
  }
}
