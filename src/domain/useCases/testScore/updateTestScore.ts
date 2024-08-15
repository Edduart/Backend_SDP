import { UpdateTestScoreDto } from "../../dtos";
import { TestScoreEntity } from "../../entities";
import { TestScoreRepository } from "../../repositories";

interface UpdateTestScoreUseCase {
  execute(dto: UpdateTestScoreDto): Promise<TestScoreEntity>;
}

export class UpdateTestScore implements UpdateTestScoreUseCase {
  constructor(private readonly repository: TestScoreRepository) {}

  execute(dto: UpdateTestScoreDto): Promise<TestScoreEntity> {
    return this.repository.update(dto);
  }
}
