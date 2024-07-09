import { CreateProfessor } from "../dtos";
import { ProfessorEntity } from "../entities"; 

export abstract class ProfessorDataSource {
  abstract create(dto: CreateProfessor): Promise<ProfessorEntity>;
  abstract get(id: string | undefined, status_id: number): Promise<ProfessorEntity[]>;
}
