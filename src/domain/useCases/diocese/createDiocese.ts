import { CreateDioceseDto } from "../../dtos";
import { DioceseEntity } from "../../entities/diocese.entity";
import { DioceseRepository } from "../../repositories/diocese.repository";

export interface CreateDioceseUseCase {
  execute(dto: CreateDioceseDto): Promise<DioceseEntity>;
}

export class CreateDiocese implements CreateDioceseUseCase {
  constructor(private readonly repository: DioceseRepository) {}

  execute(dto: CreateDioceseDto): Promise<DioceseEntity> {
    return this.repository.create(dto);
  }
}
