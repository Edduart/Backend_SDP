import { DioceseEntity } from "../entities/diocese.entity";

export abstract class DioceseRepository {
  abstract create(): Promise<DioceseEntity>;
  abstract getAll(): Promise<DioceseEntity[]>;
  abstract findById(id: number): Promise<DioceseEntity>;
  abstract updateById(): Promise<DioceseEntity>;
  abstract deleteById(id: number): Promise<DioceseEntity>;
}
