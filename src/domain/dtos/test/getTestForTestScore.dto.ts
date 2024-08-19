export class GetTestForTestScoreDto {
  constructor(public subject_id?: number, public academic_term_id?: number) {}

  static get(props: {
    [key: string]: any;
  }): [string[]?, GetTestForTestScoreDto?] {
    let { subject_id, academic_term_id } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations


    // FIXME cannot be undefined

    if (subject_id != undefined) subject_id = +subject_id;

    if (academic_term_id != undefined) academic_term_id = +academic_term_id;

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetTestForTestScoreDto(subject_id, academic_term_id),
    ];
  }
}

export interface TestForTestScoreResult {
  tests: {
    id: number;
    description: string;
    maximum_score: number;
  }[];
  seminarians?: {
    enrollment_id: number;
    seminarian_id: string;
    seminarian_surname: string;
    seminarian_forename: string;
    test_score?: {
      message?: string;
      test_id: number;
      score: number;
    }[];
  }[];
}
