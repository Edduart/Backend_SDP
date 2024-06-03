import { UpdateStageDto } from "../../dtos";
import { StageEntity } from "../../entities";
import { StageRepository } from "../../repositories";

export interface UpdateStageUseCase {
  execute(dto: UpdateStageDto): Promise<StageEntity>;
}

export class UpdateStage implements UpdateStageUseCase {
  constructor(private readonly repository: StageRepository) {}

  execute(dto: UpdateStageDto): Promise<StageEntity> {
    return this.repository.updateById(dto);
  }
}
