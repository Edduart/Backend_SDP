import { InstructorEntity } from "../entities";

export abstract class InstructorRepository {
  abstract getAll(): Promise<InstructorEntity[]>;
  abstract findById(id: string): Promise<InstructorEntity>;
}
