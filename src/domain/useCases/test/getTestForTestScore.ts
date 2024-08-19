import { GetTestForTestScoreDto, TestForTestScoreResult } from "../../dtos";
import { TestEntity } from "../../entities";
import { TestRepository } from "../../repositories";

interface GetTestForTestScoreUseCase {
  execute(dto: GetTestForTestScoreDto): Promise<TestForTestScoreResult>;
}

export class GetTestForTestScore implements GetTestForTestScoreUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: GetTestForTestScoreDto): Promise<TestForTestScoreResult> {
    return this.repository.getTestForTestScore(dto);
  }
}
