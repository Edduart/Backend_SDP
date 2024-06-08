import { DioceseEntity } from "../../entities";
import { DioceseRepository } from "../../repositories";
import { GetDioceseByNameDto } from "../../dtos";

export interface getDioceseByNameUseCase {
  execute(dto: GetDioceseByNameDto): Promise<DioceseEntity[]>;
}

export class GetDioceseByName implements getDioceseByNameUseCase {
  constructor(private readonly repository: DioceseRepository) {}

  execute(dto: GetDioceseByNameDto): Promise<DioceseEntity[]> {
    return this.repository.getByName(dto);
  }
}
