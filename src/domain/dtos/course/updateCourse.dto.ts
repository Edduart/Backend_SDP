export class UpdateCourseDto {
  private constructor(
    public readonly id: number,
    public readonly stage_id: number,
    public readonly description: string,
    public readonly instructor_id: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.stage_id) returnObj.stage_id = this.stage_id;
    if (this.description) returnObj.description = this.description;
    if (this.instructor_id) returnObj.instructor_id = this.instructor_id;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateCourseDto?] {
    const { id, stage_id, description, instructor_id } = props;

    if (!id || isNaN(Number(id))) {
      return ["Id must be a number > 0 and integer"];
    }

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

    return [
      undefined,
      new UpdateCourseDto(id, stage_id, description, instructor_id),
    ];
  }
}
