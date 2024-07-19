import { ProfessorEntity } from "../../entities";
import { ProfessorRepository } from "../../repositories";
import { GetProfessorDto } from "../../dtos";
export interface GetProfessorUseCase {
  execute(dto: GetProfessorDto): Promise<ProfessorEntity[]>;
}
export class GetProfessor implements GetProfessorUseCase {
  constructor(private readonly repository: ProfessorRepository) {}
  execute(dto: GetProfessorDto): Promise<ProfessorEntity[]> {
    return this.repository.get(dto);
  }
}
