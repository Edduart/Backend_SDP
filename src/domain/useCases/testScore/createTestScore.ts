import { CreateTestScoreDto } from "../../dtos";
import { TestScoreEntity } from "../../entities";
import { TestScoreRepository } from "../../repositories";

interface CreateTestScoreUseCase {
  execute(dto: CreateTestScoreDto): Promise<object>;
}

export class CreateTestScore implements CreateTestScoreUseCase {
  constructor(private readonly repository: TestScoreRepository) {}

  execute(dto: CreateTestScoreDto): Promise<object> {
    return this.repository.create(dto);
  }
}
