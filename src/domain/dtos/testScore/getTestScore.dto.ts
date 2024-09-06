export class GetTestScoreDto {
  constructor(public test_id: number, public enrollment_id: number) {}

  static get(props: { [key: string]: any }): [object[]?, GetTestScoreDto?] {
    let { test_id, enrollment_id } = props;
    let validationErrors: ValidationError[] = [];
    if (test_id != undefined) {
      test_id = +test_id;
      if (isNaN(Number(test_id)) || test_id < 0)
        validationErrors.push({
          field: "test_id",
          message: "test_id must be a valid ID",
        });
    }
    if (enrollment_id != undefined) {
      enrollment_id = +enrollment_id;
      if (isNaN(Number(enrollment_id)) || enrollment_id < 0)
        validationErrors.push({
          field: "enrollment_id",
          message: "enrollment_id must be a valid ID",
        });
    }
    if (validationErrors.length > 0) return [validationErrors];
    return [undefined, new GetTestScoreDto(test_id, enrollment_id)];
  }
}

interface ValidationError {
  field: string;
  message: string;
}
