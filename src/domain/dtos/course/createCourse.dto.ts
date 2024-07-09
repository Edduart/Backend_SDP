export class CreateCourseDto {
  private constructor(
    public readonly stage_id: number,
    public readonly description: string,
    public readonly instructor_id: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCourseDto?] {
    const { stage_id, description, instructor_id } = props;

    if (!stage_id) {
      return ["Stage ID is required"];
    } else if (isNaN(Number(stage_id))) {
      return ["Stage ID must be a valid ID or number"];
    }

    if (!description) {
      return ["Description is required"];
    } else if (typeof description !== "string") {
      return ["Description must be a string"];
    }

    if (!instructor_id) {
      return ["Instructor ID is required"];
    } else if (typeof instructor_id !== "string") {
      return ["Instructor ID must be a string"];
    }

    return [undefined, new CreateCourseDto(stage_id, description, instructor_id)];
  }
}
