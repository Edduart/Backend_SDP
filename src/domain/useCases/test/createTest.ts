import { CreateTestDto } from "../../dtos";
import { TestEntity } from "../../entities";
import { TestRepository } from "../../repositories";

interface CreateTestUseCase {
  execute(dto: CreateTestDto): Promise<object>;
}

export class CreateTest implements CreateTestUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: CreateTestDto): Promise<object> {
    return this.repository.create(dto);
  }
}
