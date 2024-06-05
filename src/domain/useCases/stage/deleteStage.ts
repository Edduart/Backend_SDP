import { StageEntity } from "../../entities";
import { StageRepository } from "../../repositories";

export interface DeleteStageUseCare {
  execute(id: number): Promise<StageEntity>;
}

export class DeleteStage implements DeleteStageUseCare {
  constructor(private readonly repository: StageRepository) {}

  execute(id: number): Promise<StageEntity> {
    return this.repository.delete(id);
  }
}
