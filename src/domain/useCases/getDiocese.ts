import { dioceseEntity } from "../entities/diocese.entity";
import { dioceseRepository } from "..//repositories/diocese.repository";

export interface GetDiocesesUseCase {
  execute(): Promise<dioceseEntity[]>;
}

export class GetDioceses implements GetDiocesesUseCase {
  constructor(private readonly repository: dioceseRepository) {}

  execute(): Promise<dioceseEntity[]> {
    return this.repository.getAll();
  }
}
