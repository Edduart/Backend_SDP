import { EnrollmentStatus } from "../../entities/enrollment.entity";
import {formatDate} from "../../../presentation/utils/formatDate"

export class GetEnrollmentDto {
  constructor(
    public enrollment_id?: number, 
    public seminarian_id?: string,
    public subject_id?: number,
    public academic_term_id?: number,
    public status?: EnrollmentStatus
  ) {}

  static get(props: { [key: string]: any }): [string[]?, GetEnrollmentDto?] {
    let { enrollment_id, seminarian_id, subject_id, academic_term_id, status } = props;
    let dataErrors: string[] = [];

    console.log("🚀 ~ GetEnrollmentDto ~ get ~ props:", props);

    // TODO reWork validations

    if (enrollment_id != undefined) enrollment_id = +enrollment_id;

    if (subject_id != undefined) subject_id = +subject_id;

    if (academic_term_id != undefined) academic_term_id = +academic_term_id;

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetEnrollmentDto(
        enrollment_id,
        seminarian_id,
        subject_id,
        academic_term_id,
        status
      ),
    ];
  }

  static getResponse(enrollment: Array<any>): EnrollmentGetInterface[] {
    const enrollmentDto: EnrollmentGetInterface[] = enrollment.map(
      (enrollment) => ({
        seminarian_id: enrollment.seminarian_id,
        enrollment_id: enrollment.enrollment_id,
        subject: {
          id: enrollment.subject.id,
          name: enrollment.subject.description,
        },
        academic_term: {
          id: enrollment.academic_term.id,
          start_date: formatDate(
            enrollment.academic_term.start_date.toISOString()
          ),
          end_date: formatDate(
            enrollment.academic_term.end_date.toISOString()
          ),
          status: enrollment.academic_term.status,
        },
        subject_status: enrollment.status,
      })
    );
    return enrollmentDto;
  }
}

export interface EnrollmentGetInterface {
  seminarian_id: string;
  enrollment_id: number,
  subject: {
    id: number;
    name: string;
  };
  academic_term: {
    id: number;
    start_date: string | null;
    end_date: string | null;
    status: string;
  };
  subject_status: string;
}
