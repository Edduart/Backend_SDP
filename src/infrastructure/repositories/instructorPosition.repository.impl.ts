import { InstructorPositionDataSource, InstructorPositionEntity, InstructorPositionRepository } from "../../domain";

export class InstructorPositionRepositoryImpl implements InstructorPositionRepository {
  constructor(private readonly datasource: InstructorPositionDataSource) {}

  getAll(): Promise<InstructorPositionEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<InstructorPositionEntity> {
    return this.datasource.findById(id);
  }
}
