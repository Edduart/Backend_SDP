export class InstructorEntity {
  constructor(
    public professor_id: string,
    public starting_date: Date,
    public position_id: number
  ) {}

  public static fromObject(object: { [key: string]: any }): InstructorEntity {
    const { professor_id, starting_date, position_id } = object;
    if (!professor_id) throw "professor id is required";
    if (!starting_date) {
      throw "starting date is required";
    } else if (isNaN(starting_date.getTime())) {
      throw "starting date is not a valid date";
    }
    if (!position_id) throw "position ID is required";

    return new InstructorEntity(professor_id, starting_date, position_id);
  }
}
