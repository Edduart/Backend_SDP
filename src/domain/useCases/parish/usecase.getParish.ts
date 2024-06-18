import { ParishEntity } from "../../entities/parish.entity";
import { ParishRepository } from "../../repositories/parish.repository";

export interface GetParishUseCase {
  execute(id: number): Promise<ParishEntity>;
}

export class GetParish implements GetParishUseCase {
  constructor(private readonly repository: ParishRepository) {}

  execute(id: number): Promise<ParishEntity> {
    return this.repository.findById(id);
  }
}


