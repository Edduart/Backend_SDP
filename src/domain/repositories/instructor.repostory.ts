import { InstructorEntity } from "../entities";
import { CreateInstructorDto, UpdateInstructorDto } from "../dtos"

export abstract class InstructorRepository {
  abstract create(dto: CreateInstructorDto): Promise<InstructorEntity>;
  abstract getAll(): Promise<InstructorEntity[]>;
  abstract findById(id: string): Promise<InstructorEntity>;
  abstract updateById(dto: UpdateInstructorDto): Promise<InstructorEntity>;
  abstract deleteById(id: string): Promise<InstructorEntity>;
}
