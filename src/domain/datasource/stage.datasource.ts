import { StageEntity } from "../entities";
import { CreateStageDto, UpdateStageDto } from "../dtos/";

export abstract class StageDataSource {
  abstract create(dto: CreateStageDto): Promise<StageEntity>;
  abstract updateById(dto: UpdateStageDto): Promise<StageEntity>;
  abstract getAll(): Promise<StageEntity[]>;
  abstract findById(id: number): Promise<StageEntity>;
  abstract deleteById(id: number): Promise<StageEntity>;
}
