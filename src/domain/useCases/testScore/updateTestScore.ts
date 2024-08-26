import { UpdateTestScoreDto } from "../../dtos";
import { TestScoreEntity } from "../../entities";
import { TestScoreRepository } from "../../repositories";

interface UpdateTestScoreUseCase {
  execute(dto: UpdateTestScoreDto): Promise<object>;
}

export class UpdateTestScore implements UpdateTestScoreUseCase {
  constructor(private readonly repository: TestScoreRepository) {}

  execute(dto: UpdateTestScoreDto): Promise<object> {
    return this.repository.update(dto);
  }
}
