export class UpdateTestScoreDto {
  constructor(public test_id: number, public score: number) {}
  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.score) returnObj.status = this.score;

    return returnObj;
  }
  static update(props: {
    [key: string]: any;
  }): [string[]?, UpdateTestScoreDto?] {
    let { test_id, score } = props;
    let dataErrors: string[] = [];
    if (dataErrors.length > 0) return [dataErrors];

    // TODO reWork validations

    return [undefined, new UpdateTestScoreDto(test_id, score)];
  }
}
