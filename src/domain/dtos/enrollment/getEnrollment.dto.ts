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
    
    // TODO reWork validations

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetEnrollmentDto(seminarian_id, subject_id, academic_term_id, status),
    ];
  }
}
