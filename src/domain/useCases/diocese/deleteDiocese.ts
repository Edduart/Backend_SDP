import { DioceseEntity } from "../../entities/diocese.entity";
import { DioceseRepository } from "../../repositories/diocese.repository";

export interface DeleteDioceseUseCase {
  execute(id: number): Promise<DioceseEntity>;
}

export class DeleteDiocese implements DeleteDioceseUseCase {
  constructor(private readonly repository: DioceseRepository) {}

  execute(id: number): Promise<DioceseEntity> {
    return this.repository.deleteById(id);
  }
}
