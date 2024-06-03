import { StageEntity } from "../../entities";
import { StageRepository } from "../../repositories";

export interface GetStageUseCase {
  execute(id: number): Promise<StageEntity>;
}

export class GetStage implements GetStageUseCase {
  constructor(private readonly repository: StageRepository) {}

  execute(id: number): Promise<StageEntity> {
    return this.repository.findById(id);
  }
}
