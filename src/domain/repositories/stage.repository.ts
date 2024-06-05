import { StageEntity } from "../entities";
import { UpdateStageDto, CreateStageDto } from "../dtos";

export abstract class StageRepository {
  abstract create(createStageDto: CreateStageDto): Promise<StageEntity>;
  abstract getAll(): Promise<StageEntity[]>;
  abstract findById(id: number): Promise<StageEntity>;
  abstract updateById(updateStageDto: UpdateStageDto): Promise<StageEntity>;
  abstract delete(id: number): Promise<StageEntity>;
}
