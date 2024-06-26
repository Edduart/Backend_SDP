export class StageEntity {
  constructor(
    public id: number,
    public description: string,
    ) {}

  public static fromObject(object: { [key: string]: any }): StageEntity {
    const { id, description } = object;
    if (!id) throw "Id is required";
    if (!description) throw "Description is required";


    return new StageEntity(id, description);
  }
}
