import { InstructorPostion } from "../../entities/instructor.entity";

export class UpdateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly instructor_position: InstructorPostion,
    public readonly status?: boolean
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.starting_date) returnObj.starting_date = this.starting_date;
    if (this.instructor_position) returnObj.position_id = this.instructor_position;
    if (this.status) returnObj.status = this.status;

    return returnObj;
  }

  static update(props: {
    [key: string]: any;
  }): [string?, UpdateInstructorDto?] {
    const { professor_id, starting_date, instructor_position, status } = props;

    if (!professor_id) {
      return ["Instructor ID is required"];
    } else if (typeof professor_id !== "string") {
      return ["Instructor ID must be a string"];
    }

    let newStartingDate = new Date(starting_date);
    if (!starting_date) {
      throw "starting date is required";
    } else if (newStartingDate.toString() === "Invalid Date") {
      throw "starting date is not a valid date";
    }

    if (!instructor_position) return ["Professor ID is required"];

    return [
      undefined,
      new UpdateInstructorDto(
        professor_id,
        starting_date,
        instructor_position,
        status
      ),
    ];
  }
}
