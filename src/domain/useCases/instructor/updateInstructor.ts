import { UpdateInstructorDto } from "../../dtos";
import { InstructorEntity } from "../../entities";
import { InstructorRepository } from "../../repositories";

export interface UpdateInstructorUseCase {
  execute(dto: UpdateInstructorDto): Promise<InstructorEntity>;
}

export class UpdateInstructor implements UpdateInstructorUseCase {
  constructor(private readonly repository: InstructorRepository) {}

  execute(dto: UpdateInstructorDto): Promise<InstructorEntity> {
    return this.repository.updateById(dto);
  }
}
