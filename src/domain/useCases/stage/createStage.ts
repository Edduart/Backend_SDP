import { CreateStageDto } from "../../dtos";
import { StageEntity } from "../../entities";
import { StageRepository } from "../../repositories";

export interface CreateStageUseCare {
  execute(dto: CreateStageDto): Promise<StageEntity>;
}

export class CreateStage implements CreateStageUseCare {
  constructor(private readonly repository: StageRepository) {}

  execute(dto: CreateStageDto): Promise<StageEntity> {
    return this.repository.create(dto);
  }
}
