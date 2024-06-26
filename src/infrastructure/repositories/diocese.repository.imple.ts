import {
  CreateDioceseDto,
  DioceseDatasource,
  DioceseEntity,
  DioceseRepository,
  UpdateDioceseDto,
  } from "../../domain";

export class DioceseRepositoryImpl implements DioceseRepository {
  constructor(private readonly datasource: DioceseDatasource) {}

  create(createDioceseDto: CreateDioceseDto): Promise<DioceseEntity> {
    return this.datasource.create(createDioceseDto);
  }

  getAll(): Promise<DioceseEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<DioceseEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateDioceseDto: UpdateDioceseDto): Promise<DioceseEntity> {
    return this.datasource.updateById(updateDioceseDto);
  }

  getByName(name: string): Promise<DioceseEntity[]> {
    return this.datasource.getByName(name);
  }

  deleteById(id: number): Promise<DioceseEntity> {
    return this.datasource.deleteById(id);
  }
}
