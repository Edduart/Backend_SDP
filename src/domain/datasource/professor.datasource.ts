import { CreateProfessor, UpdateProfessorDto, GetProfessorDto } from "../dtos";
import { ProfessorEntity } from "../entities";

export abstract class ProfessorDataSource {
  abstract create(dto: CreateProfessor): Promise<ProfessorEntity>;
  abstract get(dto: GetProfessorDto): Promise<ProfessorEntity[]>;
  abstract delete(id: string): Promise<object>;
  abstract update(data: UpdateProfessorDto): Promise<object>;
}
