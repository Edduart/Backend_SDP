import { DioceseEntity } from "../entities";
import { UpdateDioceseDto, CreateDioceseDto } from "../dtos";
export abstract class DioceseDatasource {
  abstract create(createDioceseDto: CreateDioceseDto): Promise<DioceseEntity>;
  abstract getAll(): Promise<DioceseEntity[]>;
  abstract findById(id: number): Promise<DioceseEntity>;
  abstract updateById(
    updateDioceseDto: UpdateDioceseDto
  ): Promise<DioceseEntity>;
}