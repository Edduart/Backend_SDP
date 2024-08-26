export class UpdateTestDto {
  constructor(public id: number, public description: string) {}
  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.description) returnObj.description = this.description;

    return returnObj;
  }
  static update(props: { [key: string]: any }): [string[]?, UpdateTestDto?] {
  let { id, description } = props;
    let dataErrors: string[] = [];
    if (dataErrors.length > 0) return [dataErrors];

    console.log(props);

    // TODO reWork validations

    return [undefined, new UpdateTestDto(id, description.toUpperCase())];
  }
}
