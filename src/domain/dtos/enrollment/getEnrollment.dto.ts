import {EnrollmentStatus} from "../../entities/enrollment.entity"

export class GetEnrollmentDto {
  constructor(
    public seminarian_id?: string,
    public subject_id?: number,
    public academic_term_id?: number,
    public status?: EnrollmentStatus
  ) {}

  static get(props: { [key: string]: any }): [string[]?, GetEnrollmentDto?] {
    let { seminarian_id, subject_id, academic_term_id, status } = props;
    let dataErrors: string[] = [];

    let subjectId, academicTermToNumber: number | undefined;

    if (!seminarian_id) {
      dataErrors.push("seminarian_id is required");
      // TODO add V-123 string validation
      /*if (!/^\d{1,20}$/.test(id))
        dataErrors.push("ID must be only numeric and no more than 20 digits ");*/
    }

    if (subject_id != undefined) {
        subject_id = +subject_id
      if (
        Number.isNaN(subject_id) ||
        !Number.isInteger(subject_id) ||
        subject_id <= 0 
      ) {
        dataErrors.push("Status must be a valid number between 0 and 1");
      }

    }
    if (academic_term_id != undefined) {
        academic_term_id = +academic_term_id;
      if (
        Number.isNaN(academic_term_id) ||
        !Number.isInteger(academic_term_id) ||
        academic_term_id <= 0
      ) {
        dataErrors.push("academic_term_id must be a valid ID");
      }
    }

    // TODO status enum check
    /*if (!status_id) {
      dataErrors.push("status_id is required");
    } else {
      if (
        Number.isNaN(status_id) ||
        !Number.isInteger(status_id) ||
        status_id < 0 ||
        status_id > 1
      )
        dataErrors.push("status_id must be a valid number between 0 and 1");
    }*/

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetEnrollmentDto(seminarian_id, subject_id, academic_term_id, status),
    ];
  }
}
