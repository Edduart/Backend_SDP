export class GetTestDto {
  constructor(
    public id?: number,
    public subject_id?: number,
    public academic_term_id?: number,
    public status?: number,
  ) {}

  static get(props: { [key: string]: any }): [string[]?, GetTestDto?] {
    let { id, subject_id, academic_term_id, status } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (id != undefined) id = +id;

    if (subject_id != undefined) subject_id = +subject_id;

    if (academic_term_id != undefined) academic_term_id = +academic_term_id;

    if (status != undefined) status = +status;

    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetTestDto(id, subject_id, academic_term_id, status),
    ];
  }}