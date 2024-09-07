import { UpdateTestDto } from "../../dtos";
import { TestEntity } from "../../entities";
import { TestRepository } from "../../repositories";

interface UpdateTestUseCase {
  execute(dto: UpdateTestDto): Promise<TestEntity>;
}

export class UpdateTest implements UpdateTestUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: UpdateTestDto): Promise<TestEntity> {
    return this.repository.update(dto);
  }
}
