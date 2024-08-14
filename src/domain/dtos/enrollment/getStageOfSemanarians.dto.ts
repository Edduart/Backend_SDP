export class GetStageOfSeminarianDto {
  constructor(public stage: string) {}

  static get(props: {
    [key: string]: any;
  }): [string[]?, GetStageOfSeminarianDto?] {
    let { stage } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new GetStageOfSeminarianDto(stage)];
  }
}
