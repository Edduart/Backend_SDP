export class UpdateStageDto {
  private constructor(
    public readonly id: number,
    public readonly description: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.description) returnObj.description = this.description;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateStageDto?] {
    const { id, description } = props;

    if (!id || isNaN(Number(id))) {
      return ["Id must be a valid number"];
    }

    if (!description) {
      return ["Description is required"];
    }

    return [undefined, new UpdateStageDto(id, description)];
  }
}
