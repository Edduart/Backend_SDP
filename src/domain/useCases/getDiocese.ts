import { DioceseEntity } from "../entities/diocese.entity";
import { DioceseRepository } from "..//repositories/diocese.repository";

export interface GetDiocesesUseCase {
  execute(): Promise<DioceseEntity[]>;
}

export class GetDioceses implements GetDiocesesUseCase {
  constructor(private readonly repository: DioceseRepository) {}

  execute(): Promise<DioceseEntity[]> {
    return this.repository.getAll();
  }
}
