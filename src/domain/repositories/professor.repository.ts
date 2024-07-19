import { CreateProfessor, UpdateProfessorDto, GetProfessorDto } from "../dtos";
import { ProfessorEntity } from "../entities";

export abstract class ProfessorRepository {
  abstract create(dto: CreateProfessor): Promise<ProfessorEntity>;
  abstract get(dto: GetProfessorDto): Promise<ProfessorEntity[]>;
  abstract delete(id: string): Promise<object>;
  abstract update(data: UpdateProfessorDto): Promise<object>;
}
