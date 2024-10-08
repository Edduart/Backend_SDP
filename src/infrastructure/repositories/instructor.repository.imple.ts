import {
  CreateInstructorDto,
  InstructorDataSource,
  InstructorEntity,
  instructorFichaDTO,
  InstructorRepository,
  UpdateInstructorDto,
} from "../../domain";

export class InstructorRepositoryImpl implements InstructorRepository {
  constructor(private readonly datasource: InstructorDataSource) {}
  Ficha(id: string): Promise<instructorFichaDTO> {
    return this.datasource.Ficha(id);
  }
  create(createDto: CreateInstructorDto): Promise<InstructorEntity> {
    return this.datasource.create(createDto);
  }
  updateById(updateDto: UpdateInstructorDto): Promise<InstructorEntity> {
    return this.datasource.updateById(updateDto);
  }
  getAll(): Promise<InstructorEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: string): Promise<InstructorEntity> {
    return this.datasource.findById(id);
  }
  deleteById(id: string): Promise<InstructorEntity> {
    return this.datasource.deleteById(id);
  }
}
