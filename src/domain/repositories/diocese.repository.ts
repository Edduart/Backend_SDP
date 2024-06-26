import { DioceseEntity } from "../entities";
import { UpdateDioceseDto, CreateDioceseDto } from "../dtos";

export abstract class DioceseRepository {
  abstract create(createDioceseDto: CreateDioceseDto): Promise<DioceseEntity>;
  abstract getAll(): Promise<DioceseEntity[]>;
  abstract findById(id: number): Promise<DioceseEntity>;
  abstract getByName(name: string): Promise<DioceseEntity[]>;
  abstract updateById(
    updateDioceseDto: UpdateDioceseDto
  ): Promise<DioceseEntity>;
  abstract deleteById(id: number): Promise<DioceseEntity>;
}
