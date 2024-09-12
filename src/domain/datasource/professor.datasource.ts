import { CreateProfessor, UpdateProfessorDto, GetProfessorDto, ProfesorFichaDTO } from "../dtos";
import { ProfessorEntity } from "../entities";

export abstract class ProfessorDataSource {
  abstract Ficha(id: string): Promise<ProfesorFichaDTO>;
  abstract create(dto: CreateProfessor): Promise<ProfessorEntity>;
  abstract get(dto: GetProfessorDto): Promise<ProfessorEntity[]>;
  abstract delete(id: string): Promise<object>;
  abstract update(data: UpdateProfessorDto): Promise<object>;
}
