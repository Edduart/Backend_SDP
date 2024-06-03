import { StageEntity } from "../../entities";
import { StageRepository } from "../../repositories";

export interface GetStagesUseCase {
  execute(): Promise<StageEntity[]>;
}

export class GetDioceses implements GetStagesUseCase {
  constructor(private readonly repository: StageRepository) {}

  execute(): Promise<StageEntity[]> {
    return this.repository.getAll();
  }
}
