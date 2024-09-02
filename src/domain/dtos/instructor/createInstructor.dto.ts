import { InstructorPostion } from "../../entities/instructor.entity";

export class CreateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly instructor_position: InstructorPostion,
    public readonly status: number,
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
    return [
      undefined,
      new CreateInstructorDto(professor_id, starting_date, instructor_position, 1),
    ];
  }
}