import { CreateParishDto } from "../../dtos";
import { ParishEntity } from "../../entities/parish.entity";
import { ParishRepository } from "../../repositories/parish.repository";

export interface CreateParishUseCare{
    execute(sper: CreateParishDto): Promise<ParishEntity>;
}

export class CreateParish implements CreateParishUseCare {
    constructor(private readonly repository: ParishRepository) {}
  
    execute(sper: CreateParishDto): Promise<ParishEntity> {
      return this.repository.create(sper);
    }
  }