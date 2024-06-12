import { InstructorEntity } from "../../entities";
import { InstructorRepository } from "../../repositories";

export interface GetInstructorsUseCase {
  execute(): Promise<InstructorEntity[]>;
}

export class GetInstructors implements GetInstructorsUseCase {
  constructor(private readonly repository: InstructorRepository) {}

  execute(): Promise<InstructorEntity[]> {
    return this.repository.getAll();
  }
}
