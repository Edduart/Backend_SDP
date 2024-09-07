import { InstructorEntity } from "../entities";
import {CreateInstructorDto, instructorFichaDTO, UpdateInstructorDto} from "../dtos"

export abstract class InstructorDataSource {
  abstract create(dto: CreateInstructorDto): Promise<InstructorEntity>;
  abstract getAll(): Promise<InstructorEntity[]>;
  abstract Ficha(id: string): Promise<instructorFichaDTO>;
  abstract findById(id: string): Promise<InstructorEntity>;
  abstract updateById(dto: UpdateInstructorDto): Promise<InstructorEntity>;
  abstract deleteById(id: string): Promise<InstructorEntity>;
}
