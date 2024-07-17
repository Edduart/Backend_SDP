export class CourseEntity {
  constructor(
    public id: number,
    public stage_id: number,
    public description: string,
    public instructor_id: string|null
  ) {}

  public static fromObject(object: { [key: string]: any }): CourseEntity {
    const { id, stage_id, description, instructor_id } = object;
    if (!id) throw "Id is required";
    if (!stage_id) throw "Stage ID is required";
    if (!description) throw "Description is required";

    return new CourseEntity(id, stage_id, description, instructor_id);
  }
}
