import { EnrollmentStatus } from "../../entities/enrollment.entity";

export class GetTestBySubjectDto {
  constructor(
    public enrollment_id?: number,
    public seminarian_id?: string,
    public subject_id?: number,
    public academic_term_id?: number,
    public status?: EnrollmentStatus
  ) {}

  static get(props: { [key: string]: any }): [string[]?, GetTestBySubjectDto?] {
    let { enrollment_id, seminarian_id, subject_id, academic_term_id, status } =
      props;
    let dataErrors: string[] = [];

    console.log("🚀 ~ GetEnrollmentDto ~ get ~ props:", props);

    // TODO reWork validations

    if (enrollment_id != undefined) enrollment_id = +enrollment_id;

    if (subject_id != undefined) subject_id = +subject_id;

    if (academic_term_id != undefined) academic_term_id = +academic_term_id;

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetTestBySubjectDto(
        enrollment_id,
        seminarian_id,
        subject_id,
        academic_term_id,
        status
      ),
    ];
  }
}