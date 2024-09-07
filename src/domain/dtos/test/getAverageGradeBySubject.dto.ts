export class GetAverageGradeBySubjectDto {
  constructor(public subject_id?: number, public academic_term_id?: number) {}
  static get(props: {
    [key: string]: any;
  }): [string[]?, GetAverageGradeBySubjectDto?] {
    let { subject_id, academic_term_id } = props;
    let dataErrors: string[] = [];
    if (subject_id == undefined || !subject_id)
      dataErrors.push("subject_id is required as parameter");
    if (academic_term_id == undefined || !academic_term_id)
      dataErrors.push("academic_term_id as parameter");
    if (subject_id != undefined) {
      if (isNaN(Number(subject_id)) || +subject_id < 0)
        dataErrors.push("subject_id is must be a valid number");
        subject_id = +subject_id;
    }
    if (academic_term_id != undefined) {
      if (isNaN(Number(academic_term_id)) || +academic_term_id < 0) dataErrors.push("academic_term_id is must be a valid number");
        academic_term_id = +academic_term_id;
    }
    if (dataErrors.length > 0) return [dataErrors];
    return [
      undefined,
      new GetAverageGradeBySubjectDto(subject_id, academic_term_id),
    ];
  }
}
