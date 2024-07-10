import { CreateProfessor } from "../dtos";
import { ProfessorEntity } from "../entities";

export abstract class ProfessorRepository {
  abstract create(dto: CreateProfessor): Promise<ProfessorEntity>;
  abstract get(
    id: string | undefined,
    status_id: number | undefined
  ): Promise<ProfessorEntity[]>;
  abstract delete(id: string): Promise<object>;
}
