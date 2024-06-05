import { CreateStageDto, StageDataSource, StageEntity, StageRepository, UpdateStageDto } from "../../domain";


export class StageRepositoryImpl implements StageRepository {
  constructor(private readonly datasource: StageDataSource) {}
  create(dto: CreateStageDto): Promise<StageEntity> {
    return this.datasource.create(dto);
  }
  getAll(): Promise<StageEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<StageEntity> {
    return this.datasource.findById(id);
  }
  updateById(dto: UpdateStageDto): Promise<StageEntity> {
    return this.datasource.updateById(dto);
  }
  delete(id: number): Promise<StageEntity> {
    return this.datasource.deleteById(id);
  }
}
