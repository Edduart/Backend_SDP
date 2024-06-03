import { StageEntity } from "../entities";
import { CreateStageDto, UpdateDioceseDto } from "../dtos/";

export abstract class StageDataSource {
  abstract create(dto: CreateStageDto): Promise<StageEntity>;
  abstract Update(dto: UpdateDioceseDto): Promise<StageEntity>;
  abstract getAll(): Promise<StageEntity[]>;
  abstract getById(id: number): Promise<StageEntity>;
  abstract Delete(id: number): Promise<null>;
}
