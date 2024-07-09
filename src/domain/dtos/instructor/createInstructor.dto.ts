import { InstructorPostion } from "../../entities/instructor.entity";

export class CreateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly instructor_position: InstructorPostion,
    public readonly status: boolean,
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateInstructorDto?] {
    const { professor_id, starting_date, instructor_position } = props;

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
      new CreateInstructorDto(professor_id, starting_date, instructor_position, true),
    ];
  }
}