export class GetStageOfSeminarianDto {
  constructor(public stage: string) {}

  static get(props: {
    [key: string]: any;
  }): [string[]?, GetStageOfSeminarianDto?] {
    let { stage } = props;
    let dataErrors: string[] = [];

    if (stage === "DISCIPULAR") {
      stage = "DISCIPULADO";
    }

    if (dataErrors.length > 0)
      // TODO reWork validations

      return [dataErrors];
    return [undefined, new GetStageOfSeminarianDto(stage)];
  }
}
