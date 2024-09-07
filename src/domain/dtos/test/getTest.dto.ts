export class GetTestDto {
  constructor(
    public id?: number,
    public subject_id?: number,
    public academic_term_id?: number,
    public status?: boolean
  ) {}

  static get(props: { [key: string]: any }): [string[]?, GetTestDto?] {
    let { id, subject_id, academic_term_id, status } = props;
    let dataErrors: string[] = [];

    if (id != undefined) {
      if (isNaN(Number(id)) || +id < 0)
        dataErrors.push("id is must be a valid number");
      id = +id;
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
      if (isNaN(Number(status)) || +status < 0)
        dataErrors.push("status is must be a valid number");
      status = Boolean(+status);
    }

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetTestDto(id, subject_id, academic_term_id, status),
    ];
  }
}
