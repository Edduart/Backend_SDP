import { GetTestScoreDto } from "../../dtos";
import { TestEntity } from "../../entities";
import { TestScoreRepository } from "../../repositories";

interface GetTestScoreUseCase {
  execute(dto: GetTestScoreDto): Promise<object>;
}

export class GetTestScore implements GetTestScoreUseCase {
  constructor(private readonly repository: TestScoreRepository) {}

  execute(dto: GetTestScoreDto): Promise<object> {
    return this.repository.get(dto);
  }
}
