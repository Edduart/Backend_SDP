import { ParishEntity } from "../../entities/parish.entity";
import { ParishRepository } from "../../repositories/parish.repository";

export interface GetParishesUseCase {
  execute(): Promise<ParishEntity[]>;
}

export class Getparishes implements GetParishesUseCase {
  constructor(private readonly repository: ParishRepository) {}

  execute(): Promise<ParishEntity[]> {
    return this.repository.getAll();
  }
}
