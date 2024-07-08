export class CreateInstructorDto {
  private constructor(
    public readonly professor_id: string,
    public readonly starting_date: Date,
    public readonly position_id: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateInstructorDto?] {
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
      new CreateInstructorDto(professor_id, starting_date, position_id),
    ];
  }
}
