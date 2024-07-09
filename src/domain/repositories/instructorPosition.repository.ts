import { InstructorPositionEntity } from "../entities";

export abstract class InstructorPositionRepository {
  abstract getAll(): Promise<InstructorPositionEntity[]>;
  abstract findById(id: number): Promise<InstructorPositionEntity>;
}
