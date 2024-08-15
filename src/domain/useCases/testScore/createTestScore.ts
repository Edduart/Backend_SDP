import { CreateTestScoreDto } from "../../dtos";
import { TestScoreEntity } from "../../entities";
import { TestScoreRepository } from "../../repositories";

interface CreateTestScoreUseCase {
  execute(dto: CreateTestScoreDto): Promise<TestScoreEntity>;
}

export class CreateTestScore implements CreateTestScoreUseCase {
  constructor(private readonly repository: TestScoreRepository) {}

  execute(dto: CreateTestScoreDto): Promise<TestScoreEntity> {
    return this.repository.create(dto);
  }
}
