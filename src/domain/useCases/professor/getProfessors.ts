import { ProfessorEntity } from "../../entities";
import { ProfessorRepository } from "../../repositories";

export interface GetProfessorUseCase {
  execute(
    id: string | undefined,
    satus_id: number | undefined
  ): Promise<ProfessorEntity[]>;
}

export class GetProfessor implements GetProfessorUseCase {
  constructor(private readonly repository: ProfessorRepository) {}

  execute(
    id: string | undefined,
    satus_id: number | undefined
  ): Promise<ProfessorEntity[]> {
    return this.repository.get(id, satus_id);
  }
}
