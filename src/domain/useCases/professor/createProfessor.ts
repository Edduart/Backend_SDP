import { CreateProfessor } from "../../dtos";
import { ProfessorEntity } from "../../entities";
import { ProfessorRepository } from "../../repositories";

export interface CreateProfessorUseCare {
  execute(dto: CreateProfessor): Promise<ProfessorEntity>;
}

export class CreateProfessorUseCase implements CreateProfessorUseCare {
  constructor(private readonly repository: ProfessorRepository) {}

  execute(dto: CreateProfessor): Promise<ProfessorEntity> {
    return this.repository.create(dto);
  }
}
