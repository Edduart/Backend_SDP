import { ParishEntity } from "../entities";
import { UpdateParishDto,CreateParishDto } from "../dtos";

export abstract class ParishDataSource {
  abstract getAll(): Promise<ParishEntity[]>;
  abstract findById(id: number): Promise<ParishEntity>;
  abstract updateById(UpdateParishDto: UpdateParishDto): Promise<ParishEntity>;
  abstract getByName(name: string): Promise<ParishEntity[]>;
  abstract getByDioceseId(id: number): Promise<ParishEntity[]>;
  abstract create(data: CreateParishDto): Promise<ParishEntity>;
  abstract delete(id: number): Promise<null>;
}