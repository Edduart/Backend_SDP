import { InstructorPositionEntity } from "../entities";

export abstract class InstructorPositionDataSource {
  abstract getAll(): Promise<InstructorPositionEntity[]>;
  abstract findById(id: number): Promise<InstructorPositionEntity>;
}
