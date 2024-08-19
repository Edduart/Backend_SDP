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

    let AllEnrollmentIds: number[] = [];
    let AllTestId: number[] = [];
    let AllScores: number[] = [];

    tests_score.forEach((test: any) => {
      if (
        isNaN(Number(test.enrollment_id)) ||
        typeof test.enrollment_id == "string" ||
        test.enrollment_id < 0
      )
        throw "data error in any enrollment_id";
      AllEnrollmentIds.push(test.enrollment_id);
      test.test.map((test2: any) => {
        if (
          isNaN(Number(test2.test_id)) ||
          typeof test2.test_id == "string" ||
          test2.test_id < 0
        )
          throw "data error in any test_id";
        AllTestId.push(test2.test_id);
        if (
          isNaN(Number(test2.score)) ||
          typeof test2.score == "string" ||
          test2.score < 0 ||
          test2.score > 100
        )
          throw "data error in any score";
        AllScores.push(test2.score);
      });
    });

    const enrollmentIds = [...new Set(AllEnrollmentIds)];
    const testIds = [...new Set(AllTestId)];

    // TODO check all cases validations

    console.log({ enrollmentIds, testIds, AllScores });

    const newObject = tests_score.reduce((accumulator: any, test: any) => {
      return accumulator.concat(
        test.test.map((test2: any) => ({
          enrollment_id: test.enrollment_id,
          test_id: test2.test_id,
          score: test2.score,
        }))
      );
    }, []);

    console.log({ newObject });
    //throw "stop in dto"

    // TODO reWork validations

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }
    return [
      undefined,
      new CreateTestScoreDto(newObject, enrollmentIds, testIds),
    ];
  }
}

interface ValidationError {
  field: string;
  message: string;
}

interface TestsScoreDto1 {
  tests_score: {
    enrollment_id: number;
    test: {
      test_id: number;
      score: number;
    }[];
  }[];
}
[];

interface TestsScoreDto {
  enrollment_id: number;
  test_id: number;
  score: number;
}
[];
