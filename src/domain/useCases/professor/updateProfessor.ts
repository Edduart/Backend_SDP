import { UpdateProfessorDto } from "../../dtos";

import { ProfessorRepository } from "../../repositories";

export interface UpdateProfessorUseCase {
  execute(dto: UpdateProfessorDto): Promise<object>;
}

export class UpdateProfessor implements UpdateProfessorUseCase {
  constructor(private readonly repository: ProfessorRepository) {}

  execute(dto: UpdateProfessorDto): Promise<object> {
    return this.repository.update(dto);
  }
}
