export class CreateTestScoreDto {
  constructor(
    public test_id: number,
    public seminarian_id: string,
    public score: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [object[]?, CreateTestScoreDto?] {
    let { test_id, seminarian_id, score } = props;
    let validationErrors: ValidationError[] = [];

    // TODO reWork validations

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }
    return [undefined, new CreateTestScoreDto(test_id, seminarian_id, score)];
  }
}

interface ValidationError {
  field: string;
  message: string;
}
