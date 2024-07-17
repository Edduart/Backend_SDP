import {
  CreateProfessor,
  ProfessorDataSource,
  ProfessorEntity,
  ProfessorRepository,
  UpdateProfessorDto,
  GetProfessorDto
} from "../../domain";

export class ProfessorRepositoryImpl implements ProfessorRepository {
  constructor(private readonly dataSource: ProfessorDataSource) {}
  update(data: UpdateProfessorDto): Promise<object> {
    return this.dataSource.update(data);
  }
  delete(id: string): Promise<object> {
    return this.dataSource.delete(id);
  }
  create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    return this.dataSource.create(createDto);
  }
  get(dto: GetProfessorDto): Promise<ProfessorEntity[]> {
    return this.dataSource.get(dto);
  }
}
