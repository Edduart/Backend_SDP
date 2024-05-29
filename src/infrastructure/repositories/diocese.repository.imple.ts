import {
  dioceseDatasource,
  dioceseEntity,
  dioceseRepository,
  } from "../../domain";

export class dioceseRepositoryImpl implements dioceseRepository {
  constructor(private readonly datasource: dioceseDatasource) {}

  create(): Promise<dioceseEntity> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<dioceseEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<dioceseEntity> {
    throw new Error("Method not implemented.");
  }
  updateById(): Promise<dioceseEntity> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<dioceseEntity> {
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