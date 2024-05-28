import { dioceseEntity } from "../entities/diocese.entity";

export abstract class dioceseRepository {
  abstract create(): Promise<dioceseEntity>;
  abstract getAll(): Promise<dioceseEntity[]>;
  abstract findById(id: number): Promise<dioceseEntity>;
  abstract updateById(): Promise<dioceseEntity>;
  abstract deleteById(id: number): Promise<dioceseEntity>;
}
