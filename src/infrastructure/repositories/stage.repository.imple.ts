import { StageDataSource, StageEntity, StageRepository } from "../../domain";


export class StageRepositoryImpl implements StageRepository {
  constructor(private readonly datasource: StageDataSource) {}

  getAll(): Promise<StageEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<StageEntity> {
    return this.datasource.findById(id);
  }
}
