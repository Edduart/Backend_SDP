import { TestScoreEntity } from "../entities";
import {
  CreateTestScoreDto,
  GetTestScoreDto,
  UpdateTestScoreDto,
} from "../dtos";

export abstract class TestScoreDataSource {
  abstract create(dto: CreateTestScoreDto): Promise<object>;
  abstract get(dto: GetTestScoreDto): Promise<object>;
  abstract update(dto: UpdateTestScoreDto): Promise<TestScoreEntity>;
}
