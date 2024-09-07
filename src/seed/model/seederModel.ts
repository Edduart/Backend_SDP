//modelo de la la clase

type modelType = {
  model: Function;
  data: object;
};

export class modelPrismaData {
  constructor(
    public model: modelType 
  ) {
    this.callSeeder(this.model);
  }
  callSeeder = async (data: modelType) => {
    await data.model({
      data: data.data,
    });
  };
}
