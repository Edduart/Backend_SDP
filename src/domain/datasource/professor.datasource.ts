import { CreateProfessor, UpdateProfessorDto } from "../dtos";
import { ProfessorEntity } from "../entities"; 

export abstract class ProfessorDataSource {
  abstract create(dto: CreateProfessor): Promise<ProfessorEntity>;
  abstract get(
    id: string | undefined,
    status_id: number
  ): Promise<ProfessorEntity[]>;
  abstract delete(id: string): Promise<object>;
  abstract update(data: UpdateProfessorDto): Promise<object>;
}
