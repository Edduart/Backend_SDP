export class GetDioceseByNameDto {
  private constructor(
    //public readonly id: number,
    public readonly name: string,
    //public readonly holder: string
  ) {}

  static getByName(props: { [key: string]: any }): [string?, GetDioceseByNameDto?] {
    const { name } = props;

    if (!name) {
      return ["Name or Holder is required"];
    } else if (typeof name !== "string") {
      return ["Name must be a string"];
    } 

    return [undefined, new GetDioceseByNameDto(name)];
  }
}
