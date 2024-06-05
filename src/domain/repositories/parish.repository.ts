import { ParishEntity } from "../entities";
import { UpdateParishDto } from '../dtos/parish/updateParish.dto';
import { CreateParishDto } from '../dtos/parish/createParish.dto';

export abstract class ParishRepository {
  abstract create(data: CreateParishDto): Promise<ParishEntity>;
  abstract getAll(): Promise<ParishEntity[]>;
  abstract findById(id: number): Promise<ParishEntity>;
  abstract updateById( updateDioceseDto: UpdateParishDto): Promise<ParishEntity>;
  abstract Delete(id: number): Promise<null>;
}
