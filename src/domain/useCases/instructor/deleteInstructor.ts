import { InstructorEntity } from "../../entities";
import { InstructorRepository } from "../../repositories";

export interface DeleteInstructorUseCase {
  execute(id: string): Promise<InstructorEntity>;
}

export class DeleteInstructor implements DeleteInstructorUseCase {
  constructor(private readonly repository: InstructorRepository) {}

  execute(id: string): Promise<InstructorEntity> {
    return this.repository.deleteById(id);
  }
}
