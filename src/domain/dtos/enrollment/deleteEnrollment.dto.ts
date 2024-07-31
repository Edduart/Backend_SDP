export class DeleteEnrollmentDto {
  constructor(
    public seminarian_id: string,
    public subject_id: number,
    public academic_term_id: number
  ) {}

  static delete(props: {
    [key: string]: any;
  }): [string[]?, DeleteEnrollmentDto?] {
    let { seminarian_id, subject_id, academic_term_id } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new DeleteEnrollmentDto(seminarian_id, subject_id, academic_term_id),
    ];
  }
}
