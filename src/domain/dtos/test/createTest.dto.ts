export class CreateTestDto {
  constructor(
    public subject_id: number,
    public academic_term_id: number,
    public tests: test[],
  ) {}

  static create(props: { [key: string]: any }): [object[]?, CreateTestDto?] {
    let { subject_id, academic_term_id, tests } = props;
    let validationErrors: ValidationError[] = [];

    console.log({ props });

    // TODO reWork validations

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }
    return [undefined, new CreateTestDto(subject_id, academic_term_id, tests)];
  }
}

interface ValidationError {
  field: string;
  message: string;
}

interface test {
  description: string;
  maximum_score: number;
}[]