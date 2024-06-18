import { DioceseEntity } from "../../entities";
import { DioceseRepository } from "../../repositories";

export interface getDioceseByNameUseCase {
  execute(name: string): Promise<DioceseEntity[]>;
}

export class GetDioceseByName implements getDioceseByNameUseCase {
  constructor(private readonly repository: DioceseRepository) {}

  execute(name: string): Promise<DioceseEntity[]> {
    return this.repository.getByName(name);
  }
}
