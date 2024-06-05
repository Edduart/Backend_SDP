import { ParishEntity } from "../../entities/parish.entity";
import { ParishRepository } from "../../repositories/parish.repository";

export interface DeleteParishUseCase{
    execute(id: number): Promise<null>;
}

export class DeleteParish implements DeleteParishUseCase {
    constructor(private readonly repository: ParishRepository) {}
  
    execute(id: number): Promise<null> {
      return this.repository.Delete(id);
    }
  }