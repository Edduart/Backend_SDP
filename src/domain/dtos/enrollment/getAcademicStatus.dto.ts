export class GetAcademicStatusDto {
  constructor(public seminarian_id?: string) {}

  static get(props: {
    [key: string]: any;
  }): [string[]?, GetAcademicStatusDto?] {
    let { seminarian_id } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new GetAcademicStatusDto(seminarian_id)];
  }
}
