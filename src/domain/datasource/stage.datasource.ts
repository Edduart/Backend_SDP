import { StageEntity } from "../entities";

export abstract class StageDataSource {
  abstract getAll(): Promise<StageEntity[]>;
  abstract findById(id: number): Promise<StageEntity>;
}
