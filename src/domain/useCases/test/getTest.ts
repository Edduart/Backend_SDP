import { GetTestDto } from "../../dtos";
import { TestEntity } from "../../entities";
import { TestRepository } from "../../repositories";

interface GetTestUseCase {
  execute(dto: GetTestDto): Promise<object>;
}

export class GetTest implements GetTestUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: GetTestDto): Promise<object> {
    return this.repository.get(dto);
  }
}
