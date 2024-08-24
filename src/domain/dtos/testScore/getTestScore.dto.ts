export class GetTestScoreDto {
  constructor(public test_id: number, public enrollment_id: number) {}

  static get(props: { [key: string]: any }): [string[]?, GetTestScoreDto?] {
    let { test_id, enrollment_id } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (test_id != undefined) test_id = +test_id;

    if (enrollment_id != undefined) enrollment_id = +enrollment_id;

    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new GetTestScoreDto(test_id, enrollment_id)];
  }
}
