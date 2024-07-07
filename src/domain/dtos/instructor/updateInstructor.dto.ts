export class UpdateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly position_id: number
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.starting_date) returnObj.starting_date = this.starting_date;
    if (this.position_id) returnObj.position_id = this.position_id;

    return returnObj;
  }

  static update(props: {
    [key: string]: any;
  }): [string?, UpdateInstructorDto?] {
    const { professor_id, starting_date, position_id } = props;

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

    if (!position_id) {
      return ["Professor ID is required"];
    } else if (isNaN(Number(position_id))) {
      return ["Professor ID must be a valid ID or number"];
    }

    return [
      undefined,
      new UpdateInstructorDto(professor_id, starting_date, position_id),
    ];
  }
}
