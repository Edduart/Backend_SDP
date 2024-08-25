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

export interface EnrollmentTestResult {
  seminarian_id: string;
  seminarian_surname: string;
  seminarian_forename: string;
  subject_id: number;
  subject_name: string;
  subject_status: number;
  enrollment_id: number;
  academic_term_id: number;
  start_date: string | null;
  end_date: string | null;
  academic_term_status: number;
  test_score: {
    message?: string;
    test_description?: string;
    test_score_out_of_100: string;
    test_score_out_max_test_score: string;
    test_score_was_edited?: string | null;
  }[];
  subject_total_score_out_of_graded_score: string;
  subject_total_score_out_of_graded_scored_10_scale: string;
}
[];