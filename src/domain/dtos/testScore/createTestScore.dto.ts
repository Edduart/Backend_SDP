export class CreateTestScoreDto {
  constructor(
    public tests: TestsScoreDto,
    public enrollmentIds: number[],
    public testIds: number[]
  ) {}

  static create(props: {
    [key: string]: any;
  }): [object[]?, CreateTestScoreDto?] {
    let { tests_score } = props;
    let validationErrors: ValidationError[] = [];

    let allEnrollmentIds: number[] = [];
    let allTestId: number[] = [];
    let allScores: number[] = [];

    tests_score.forEach((test: any) => {
      if (
        isNaN(Number(test.enrollment_id)) ||
        typeof test.enrollment_id == "string" ||
        test.enrollment_id < 0
      )
        throw "data error in any enrollment_id";
      allEnrollmentIds.push(test.enrollment_id);
      test.test.map((test2: any) => {
        if (
          isNaN(Number(test2.test_id)) ||
          typeof test2.test_id == "string" ||
          test2.test_id < 0
        )
          throw "data error in any test_id";
        allTestId.push(test2.test_id);
        if (
          isNaN(Number(test2.score)) ||
          typeof test2.score == "string" ||
          test2.score < 0 ||
          test2.score > 20
        )
          throw "data error in any score";
        allScores.push(test2.score);
      });
    });

    const enrollmentIds = [...new Set(allEnrollmentIds)];
    const testIds = [...new Set(allTestId)];

    // TODO check all cases validations

    console.log({ enrollmentIds, testIds, allScores });

    const prepareTestScore = tests_score.reduce((accumulator: any, test: any) => {
      return accumulator.concat(
        test.test.map((assignment: any) => ({
          enrollment_id: test.enrollment_id,
          test_id: assignment.test_id,
          score: assignment.score,
          last_edited_date: null
        }))
      );
    }, []);

    console.log({ prepareTestScore });
    //throw "stop in dto"

    // TODO reWork validations

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }
    return [
      undefined,
      new CreateTestScoreDto(prepareTestScore, enrollmentIds, testIds),
    ];
  }
}

interface ValidationError {
  field: string;
  message: string;
}

interface TestsScoreDto {
  enrollment_id: number;
  test_id: number;
  score: number;
}
[];
