import { CreateStageDto, StageDataSource, StageEntity, StageRepository, UpdateStageDto } from "../../domain";


export class StageRepositoryImpl implements StageRepository {
  constructor(private readonly datasource: StageDataSource) {}
    create(createStageDto: CreateStageDto): Promise<StageEntity> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<StageEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<StageEntity> {
        throw new Error("Method not implemented.");
    }
    updateById(updateStageDto: UpdateStageDto): Promise<StageEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }


}
