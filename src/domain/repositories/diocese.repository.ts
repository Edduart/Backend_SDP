import { DioceseEntity } from "../entities";
import { UpdateDioceseDto } from '../dtos/diocese/updateDiocese.dto';

export abstract class DioceseRepository {
  abstract getAll(): Promise<DioceseEntity[]>;
  abstract findById(id: number): Promise<DioceseEntity>;
  abstract updateById( updateDioceseDto: UpdateDioceseDto): Promise<DioceseEntity>;
}
