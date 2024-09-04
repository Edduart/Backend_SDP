export class GetAcademicTermByEnrollmentDto {
  constructor(public seminarian_id?: string) {}

  static get(props: {
    [key: string]: any;
  }): [string[]?, GetAcademicTermByEnrollmentDto?] {
    let { seminarian_id } = props;
    let dataErrors: string[] = [];

    console.log("🚀 ~ GetAcademicTermByEnrollmentDto ~ get ~ props:", props);

    // TODO reWork validations

    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new GetAcademicTermByEnrollmentDto(seminarian_id)];
  }
}

export interface academicTermMap {
  seminarian_id: string;
  academic_term: {
    academic_term_id: number;
    academic_term_semester: number;
    academic_term_start_date: string | null;
    academic_term_end_date: string | null;
    academic_term_status: string;
  }[];
}[];
