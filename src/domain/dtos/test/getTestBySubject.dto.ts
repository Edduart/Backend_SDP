import { Prisma } from "@prisma/client";
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

    if (enrollment_id != undefined) {
      if (isNaN(Number(enrollment_id)) || +enrollment_id < 0)
        dataErrors.push("id is must be a valid number");
      enrollment_id = +enrollment_id;
    }

    if (seminarian_id != undefined) {
      if (!/^(V|E)-\d{1,18}$/.test(seminarian_id))
        dataErrors.push("id is must follows this format: V-xxxxxx");
    }

    if (subject_id != undefined) {
      if (isNaN(Number(subject_id)) || +subject_id < 0)
        dataErrors.push("subject_id is must be a valid number");
      subject_id = +subject_id;
    }

    if (academic_term_id != undefined) {
      if (isNaN(Number(academic_term_id)) || +academic_term_id < 0)
        dataErrors.push("academic_term_id is must be a valid number");
      academic_term_id = +academic_term_id;
    }

    if (status != undefined) {
      if(!Object.values(EnrollmentStatus).includes(status)) dataErrors.push("status is must be a valid enrollment status in uppercase");
    }

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
  grade_point_average: string;
  enrollment: {
    subject_id: number;
    subject_name: string;
    subject_status: string;
    enrollment_id: number;
    academic_term_id: number;
    start_date: string | null;
    end_date: string | null;
    academic_term_status: string;
    test_score: {
      message?: string;
      test_description?: string;
      test_score_out_of_20: string;
      test_score_out_max_test_score: string;
      test_score_was_edited?: string | null;
    }[];
    subject_total_score_out_of_graded_score: string;
    subject_total_score_out_of_graded_scored_10_scale: string;
    subject_total_score_out_of_graded_scored_20_scale: string;
  }[];
}
[];
