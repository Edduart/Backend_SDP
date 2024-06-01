import {
  DioceseDatasource,
  DioceseEntity,
  DioceseRepository,
  UpdateDioceseDto
  } from "../../domain";

export class DioceseRepositoryImpl implements DioceseRepository {
  constructor(private readonly datasource: DioceseDatasource) {}

  getAll(): Promise<DioceseEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<DioceseEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateDioceseDto:UpdateDioceseDto): Promise<DioceseEntity> {
    return this.datasource.updateById(updateDioceseDto);
  }
}

