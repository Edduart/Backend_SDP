import { DioceseEntity } from "../entities/diocese.entity";
import { UpdateDioceseDto } from "../dtos";
export abstract class DioceseDatasource {
  abstract getAll(): Promise<DioceseEntity[]>;
  abstract findById(id: number): Promise<DioceseEntity>;
  abstract updateById( updateDioceseDto: UpdateDioceseDto ): Promise<DioceseEntity>;
}