import { InstructorPostion } from "../../entities/instructor.entity";

export class UpdateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly instructor_position: InstructorPostion,
    public readonly status?: number,
    public readonly instructor_role?: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.starting_date) returnObj.starting_date = this.starting_date;
    if (this.instructor_position)
      returnObj.instructor_position = this.instructor_position;
    if (this.status) returnObj.status = this.status;

    return returnObj;
  }

  static update(props: {
    [key: string]: any;
  }): [string?, UpdateInstructorDto?] {
    let { professor_id, starting_date, instructor_position, status } = props;

    console.log(props);

    if (!professor_id) {
      return ["Instructor ID is required"];
    } else if (typeof professor_id !== "string") {
      return ["Instructor ID must be a string"];
    }

    if (!starting_date) {
      throw "starting date is required";
    }
    const completeDate = starting_date.toString() + "T00:00:00.000Z";
    let newStartingDate = new Date(completeDate);
    starting_date = completeDate;
    console.log(starting_date);
    if (newStartingDate.toString() === "Invalid Date") {
      throw "starting date is not a valid date";
    }
    if (!instructor_position) return ["instructor position is required"];
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
      new UpdateInstructorDto(
        professor_id,
        starting_date,
        instructor_position,
        status,
        instructor_role
      ),
    ];
  }
}
