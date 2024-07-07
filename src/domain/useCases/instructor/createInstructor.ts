import { CreateInstructorDto } from "../../dtos";
import { InstructorEntity } from "../../entities";
import { InstructorRepository } from "../../repositories";

export interface CreateInstructorUseCase {
  execute(dto: CreateInstructorDto): Promise<InstructorEntity>;
}

export class CreateInstructor implements CreateInstructorUseCase {
  constructor(private readonly repository: InstructorRepository) {}

  execute(dto: CreateInstructorDto): Promise<InstructorEntity> {
    return this.repository.create(dto);
  }
}
