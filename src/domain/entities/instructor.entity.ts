import { formatDate } from "../../presentation/utils/formatDate";

export class InstructorEntity {
  constructor(
    public professor_id: string,
    public starting_date: Date,
    public instructor_position: InstructorPostion,
    public status?: Boolean,
    public starting_date_string?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): InstructorEntity {

    let {
      professor_id,
      starting_date,
      instructor_position,
      status,
      starting_date_string,
    } = object;

    if (starting_date_string == undefined) starting_date_string = formatDate(starting_date.toISOString());

    if (!professor_id) throw "professor id is required";
    if (!starting_date) {
      throw "starting date is required";
    } else if (isNaN(starting_date.getTime())) {
      throw "starting date is not a valid date";
    }
    if (!instructor_position) throw "Instructor position is required";

    return new InstructorEntity(
      professor_id,
      starting_date,
      instructor_position,
      status,
      starting_date_string
    );
  }
}

export enum InstructorPostion {
  RECTOR = "RECTOR",
  VICERECTOR = "VICERECTOR",
  ACADEMICO = "ACADEMICO",
  ASESOR_PROPEDEUTICO = "ASESOR PROPEDEUTICO",
  DIRECTOR_ESPIRITUAL = "DIRECTOR ESPIRITUAL",
  ECONOMO = "ECONOMO",
}