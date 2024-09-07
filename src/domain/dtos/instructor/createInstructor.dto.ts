import { InstructorPostion } from "../../entities/instructor.entity";

export class CreateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly instructor_position: InstructorPostion,
    public readonly status: number,
    public readonly instructor_role: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateInstructorDto?] {
    let { professor_id, starting_date, instructor_position } = props;
    if (!professor_id) {
      return ["Instructor ID is required"];
    } else if (typeof professor_id !== "string") {
      return ["Instructor ID must be a string"];
    }
    const completeDate = starting_date.toString() + "T00:00:00.000Z";
    let newStartingDate = new Date(completeDate);
    starting_date = newStartingDate;
    if (newStartingDate.toString() === "Invalid Date") {
      return ["starting date is not a valid date"];
    }
    if (!instructor_position) return ["Instructor position is required"];
    let instructor_role: number = 0;

    if (
      instructor_position === "INSTRUCTOR" ||
      instructor_position === "DIRECTOR_ESPIRITUAL" ||
      instructor_position === "ECONOMO"
    ) {
      instructor_role = 6;
    } else if (instructor_position === "ASESOR_PROPEDEUTICO") {
      instructor_role = 7;
    } else if (instructor_position === "VICERECTOR") {
      instructor_role = 3;
    } else if (instructor_position === "RECTOR") {
      instructor_role = 2;
    } else {
      return [`error instructor role no valid, ${instructor_position}`];
    }

    return [
      undefined,
      new CreateInstructorDto(
        professor_id,
        starting_date,
        instructor_position,
        1,
        instructor_role
      ),
    ];
  }
}
