export class InstructorPositionEntity {
  constructor(public id: number, public description: string) {}

  public static fromObject(object: {
    [key: string]: any;
  }): InstructorPositionEntity {
    const { id, description } = object;
    if (!id) throw "Id is required";
    if (!description) throw "Description is required";

    return new InstructorPositionEntity(id, description);
  }
}
