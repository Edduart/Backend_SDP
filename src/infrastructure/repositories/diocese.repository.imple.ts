import {
  DioceseDatasource,
  DioceseEntity,
  DioceseRepository,
  } from "../../domain";

export class DioceseRepositoryImpl implements DioceseRepository {
  constructor(private readonly datasource: DioceseDatasource) {}

  create(): Promise<DioceseEntity> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<DioceseEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<DioceseEntity> {
    throw new Error("Method not implemented.");
  }
  updateById(): Promise<DioceseEntity> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<DioceseEntity> {
    throw new Error("Method not implemented.");
  }
}

  /*constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }*/