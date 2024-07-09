import {
  CreateProfessor,
  ProfessorDataSource,
  ProfessorEntity,
  ProfessorRepository,
} from "../../domain";

export class ProfessorRepositoryImpl implements ProfessorRepository {
  constructor(private readonly datasource: ProfessorDataSource) {}
  create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    return this.datasource.create(createDto);
  }
  get(
    id: string | undefined,
    status_id: number | undefined
  ): Promise<ProfessorEntity[]> {
    return this.datasource.get(id, status_id!);
  } // check this status must be !null, never
}
