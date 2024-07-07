import { InstructorPositionEntity } from "../../entities";
import { InstructorPositionRepository } from "../../repositories";

export interface GetInstructorPositionsUseCase {
  execute(): Promise<InstructorPositionEntity[]>;
}

export class GetInstructorPositions implements GetInstructorPositionsUseCase {
  constructor(private readonly repository: InstructorPositionRepository) {}

  execute(): Promise<InstructorPositionEntity[]> {
    return this.repository.getAll();
  }
}
