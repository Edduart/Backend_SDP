export class GetTestScoreDto {
  constructor(public test_id: number, public seminarian_id: string) {}

  static get(props: { [key: string]: any }): [string[]?, GetTestScoreDto?] {
    let { test_id, seminarian_id } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (test_id != undefined) test_id = +test_id;

    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new GetTestScoreDto(test_id, seminarian_id)];
  }
}
