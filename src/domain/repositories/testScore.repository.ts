import { TestScoreEntity } from "../entities";
import {
  CreateTestScoreDto,
  GetTestScoreDto,
  UpdateTestScoreDto,
} from "../dtos";

export abstract class TestScoreRepository {
  abstract create(dto: CreateTestScoreDto): Promise<TestScoreEntity>;
  abstract get(dto: GetTestScoreDto): Promise<object>;
  abstract update(dto: UpdateTestScoreDto): Promise<TestScoreEntity>;
}
