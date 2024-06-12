import { InstructorEntity } from "../../entities";
import { InstructorRepository } from "../../repositories";

export interface GetInstructorUseCase {
  execute(id: string): Promise<InstructorEntity>;
}

export class GetInstructor implements GetInstructorUseCase {
  constructor(private readonly repository: InstructorRepository) {}

  execute(id: string): Promise<InstructorEntity> {
    return this.repository.findById(id);
  }
}
