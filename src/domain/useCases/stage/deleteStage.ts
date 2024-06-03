import { StageRepository } from "../../repositories";

export interface DeleteStageUseCare {
  execute(id: number): Promise<null>;
}

export class DeleteStage implements DeleteStageUseCare {
  constructor(private readonly repository: StageRepository) {}

  execute(id: number): Promise<null> {
    return this.repository.delete(id);
  }
}
