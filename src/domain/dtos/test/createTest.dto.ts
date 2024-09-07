export class CreateTestDto {
  constructor(
    public subject_id: number,
    public academic_term_id: number,
    public tests: test[]
  ) {}

  static create(props: { [key: string]: any }): [object[]?, CreateTestDto?] {
    let { subject_id, academic_term_id, tests } = props;
    let validationErrors: ValidationError[] = [];
    console.log({ props });

    if (
      isNaN(Number(subject_id)) ||
      typeof subject_id == "string" ||
      subject_id < 0
    )
      validationErrors.push({
        field: "subject_id",
        message: "subject_id must be a valid ID",
      });

    if (
      isNaN(Number(academic_term_id)) ||
      typeof academic_term_id == "string" ||
      academic_term_id < 0
    )
      validationErrors.push({
        field: "academic_term_id",
        message: "academic_term_id must be a valid ID",
      });

    for (const test of tests) {
      if (!test.description) {
        validationErrors.push({
          field: "description",
          message: "description is required",
        });
        break;
      } else {
        if (
          typeof test.description !== "string" ||
          test.description.length < 4 ||
          test.description.length > 100
        ) {
          validationErrors.push({
            field: "test_description",
            message: "any of the test description is invalid, must be longer than 4 letters and no longer than 100",
          });
          break;
        }
      }
      if (!test.maximum_score) {
        validationErrors.push({
          field: "maximum_score",
          message: "maximum_score is required",
        });
      } else {
        if (
          isNaN(Number(test.maximum_score)) ||
          typeof test.maximum_score !== "number" ||
          test.maximum_score < 1 ||
          test.maximum_score > 100
        )
          validationErrors.push({
            field: "maximum_score",
            message:
              "maximum_score must be a number more than 1 and less than 100",
          });
        break;
      }
    }

    console.log({ validationErrors });

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }

    // descriptions to uppercase

    const testScoreToUpperCase: test[] = tests.map((test: any) => ({
      description: test.description.toUpperCase(),
      maximum_score: test.maximum_score,
    }));

    console.log({ testScoreToUpperCase });

    return [
      undefined,
      new CreateTestDto(subject_id, academic_term_id, testScoreToUpperCase),
    ];
  }
}

interface ValidationError {
  field: string;
  message: string;
}

interface test {
  description: string;
  maximum_score: number;
}
[];
