import { StageEntity } from "../entities";

export abstract class StageRepository {
  abstract getAll(): Promise<StageEntity[]>;
  abstract findById(id: number): Promise<StageEntity>;
}
