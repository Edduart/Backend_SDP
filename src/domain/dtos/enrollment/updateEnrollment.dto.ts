import { EnrollmentStatus } from "../../entities/enrollment.entity";
export class UpdateEnrollmentDto {
  constructor(
    public seminarian_id: string,
    public subject_id: number[],
    public academic_term_id: number,
    public status: EnrollmentStatus
  ) {}
  get values() {
    const returnObj: { [key: string]: any } = {};
    //if (this.seminarian_id) returnObj.seminarian_id = this.seminarian_id;
    //if (this.subject_id) returnObj.subject_id = this.subject_id;
    if (this.academic_term_id)
      returnObj.academic_term_id = this.academic_term_id;
    if (this.status) returnObj.status = this.status;
    return returnObj;
  }
  static update(props: {
    [key: string]: any;
  }): [string[]?, UpdateEnrollmentDto?] {
    let { seminarian_id, subject_id, academic_term_id, status } = props;
    let dataErrors: string[] = [];
    if (dataErrors.length > 0) return [dataErrors];

    console.log(props);

    // TODO subject_id maybe only one number

    // TODO reWork validations

    return [
      undefined,
      new UpdateEnrollmentDto(
        seminarian_id,
        [subject_id],
        academic_term_id,
        status
      ),
    ];
  }
}
