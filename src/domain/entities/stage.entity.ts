export class StageEntity {
  constructor(public id: number, public description: string) {}

  public static fromObject(object: { [key: string]: any }): StageEntity {
    const { id, description } = object;
    if (!id) throw "Id is required";
    if (!description) throw "Description is required";

    return new StageEntity(id, description);
  }
}

export const stages = { // FIXME add 4 as "culminado" if necessary
  ALL: 0,
  PROPEDEUTICO: 1,
  DISCIPULAR: 2,
  CONFIGURATIVA: 3,
};
