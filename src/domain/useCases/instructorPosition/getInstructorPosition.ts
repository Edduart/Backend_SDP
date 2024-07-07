import { InstructorPositionEntity } from "../../entities";
import { InstructorPositionRepository } from "../../repositories";

export interface GetInstructorPositionUseCase {
  execute(id: number): Promise<InstructorPositionEntity>;
}

export class GetInstructorPosition implements GetInstructorPositionUseCase {
  constructor(private readonly repository: InstructorPositionRepository) {}

  execute(id: number): Promise<InstructorPositionEntity> {
    return this.repository.findById(id);
  }
}
