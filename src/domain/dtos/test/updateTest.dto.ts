
export class UpdateTestDto {
  constructor(
    public description: string,
    public status: number,
    public maximum_score: number
  ) {}
  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.description) returnObj.description = this.description;
    if (this.status) returnObj.status = this.status;
    if (this.maximum_score) returnObj.maximum_score = this.maximum_score;

    return returnObj;
  }
  static update(props: { [key: string]: any }): [string[]?, UpdateTestDto?] {
    let { description, status, maximum_score } = props;
    let dataErrors: string[] = [];
    if (dataErrors.length > 0) return [dataErrors];


    // TODO reWork validations

    return [undefined, new UpdateTestDto(description, status, maximum_score)];
  }
}
