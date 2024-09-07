//import { DeleteTestDto } from "../../dtos";
import { TestEntity } from "../../entities";
import { TestRepository } from "../../repositories";

interface DeleteTestUseCase {
  execute(id: number): Promise<TestEntity>;
}

export class DeleteTest implements DeleteTestUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(id: number): Promise<TestEntity> {
    return this.repository.delete(id);
  }
}
