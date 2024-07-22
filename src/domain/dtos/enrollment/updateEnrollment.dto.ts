export class UpdateEnrollmentDto {
  constructor(
    //public seminarian_id: string,
    public subject_id: number,
    public academic_term_id: number,
    public status_id: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    //if (this.seminarian_id) returnObj.seminarian_id = this.seminarian_id;
    //if (this.subject_id) returnObj.subject_id = this.subject_id;
    if (this.academic_term_id)
      returnObj.academic_term_id = this.academic_term_id;
    if (this.status_id) returnObj.status_id = this.status_id;

    return returnObj;
  }

  static update(props: {
    [key: string]: any;
  }): [string[]?, UpdateEnrollmentDto?] {
    let { subject_id, academic_term_id, status_id } = props;
    let dataErrors: string[] = [];

    //let statusToNumber: number | undefined;

    /*if (!seminarian_id) {
      dataErrors.push("seminarian_id is required");
      /*if (!/^\d{1,20}$/.test(id))
        dataErrors.push("ID must be only numeric and no more than 20 digits ");
    }
    if (!subject_id) {
      dataErrors.push("subject_id is required");
    } else {
      if (
        Number.isNaN(subject_id) ||
        !Number.isInteger(subject_id) ||
        subject_id < 0 ||
        subject_id > 1
      )
        dataErrors.push("Status must be a valid number between 0 and 1");
    }*/

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
    if (status_id == undefined) {
      dataErrors.push("status_id is required");
    } else {
      if (
        Number.isNaN(status_id) ||
        !Number.isInteger(status_id) ||
        status_id < 0 ||
        status_id > 1
      )
        dataErrors.push("status_id must be a valid number between 0 and 1");
    }

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new UpdateEnrollmentDto(subject_id, academic_term_id, status_id),
    ];
  }
}
