import { ProfessorEntity } from "../../entities";
import { ProfessorRepository } from "../../repositories";

export interface DeleteProfessorUseCase {
  execute(id: string): Promise<object>;
}

export class DeleteProfessor implements DeleteProfessorUseCase {
  constructor(private readonly repository: ProfessorRepository) {}

  execute(id: string): Promise<object> {
    return this.repository.delete(id);
  }
}
