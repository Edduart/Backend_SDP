import { DioceseEntity } from "../../entities/diocese.entity";
import { DioceseRepository } from "../../repositories/diocese.repository";

export interface GetDioceseUseCase {
  execute(id: number): Promise<DioceseEntity>;
}

export class GetDiocese implements GetDioceseUseCase {
  constructor(private readonly repository: DioceseRepository) {}

  execute(id: number): Promise<DioceseEntity> {
    return this.repository.findById(id);
  }
}
