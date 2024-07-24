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

    if (!seminarian_id) {
      dataErrors.push("seminarian_id is required");
      if (!/^\d{1,20}$/.test(seminarian_id))
        dataErrors.push("ID must be only numeric and no more than 20 digits ");
    }
    if (!subject_id) {
      dataErrors.push("subject_id is required");
    } else {
      if (
        Number.isNaN(subject_id) ||
        !Number.isInteger(subject_id) ||
        subject_id <= 0
      )
        dataErrors.push("Status must be a valid number");
    }

    if (!academic_term_id) {
      dataErrors.push("academic_term_id is required");
    } else {
      if (
        Number.isNaN(academic_term_id) ||
        !Number.isInteger(academic_term_id) ||
        academic_term_id <= 0
      )
        dataErrors.push(
          "academic_term_id must be a valid number between 0 and 1"
        );
    }

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new DeleteEnrollmentDto(seminarian_id, subject_id, academic_term_id),
    ];
  }
}
