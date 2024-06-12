import {
  InstructorDataSource,
  InstructorEntity,
  InstructorRepository,
} from "../../domain";

export class InstructorRepositoryImpl
  implements InstructorRepository
{
  constructor(private readonly datasource: InstructorDataSource) {}

  getAll(): Promise<InstructorEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: string): Promise<InstructorEntity> {
    return this.datasource.findById(id);
  }
}
