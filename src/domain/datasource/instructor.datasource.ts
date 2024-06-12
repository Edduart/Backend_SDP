import { InstructorEntity } from "../entities";

export abstract class InstructorDataSource {
  abstract getAll(): Promise<InstructorEntity[]>;
  abstract findById(id: string): Promise<InstructorEntity>;
}
