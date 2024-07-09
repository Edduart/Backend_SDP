export class InstructorEntity {
  constructor(
    public professor_id: string,
    public starting_date: Date,
    public instructor_position: InstructorPostion,
    public status? : Boolean,
  ) {}

  public static fromObject(object: { [key: string]: any }): InstructorEntity {
    const { professor_id, starting_date, instructor_position, status } = object;
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
      status
    );
  }
}

export enum InstructorPostion {
  RECTOR = "RECTOR",
  VICERECTOR = "VICERECTOR",
  ACADEMICO = "ACADEMICO",
  PROPEDEUTICO = "ASESOR PROPEDEUTICO",
  DIRECTOR_ESPIRITUAL = "DIRECTOR ESPIRITUAL",
  ECONOMO = "ECONOMO",
}