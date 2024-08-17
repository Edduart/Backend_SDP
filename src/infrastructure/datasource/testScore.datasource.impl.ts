import { prisma } from "../../data/postgres";
import {
    CreateTestScoreDto,
    GetTestScoreDto,
  TestScoreDataSource,
  TestScoreEntity,
  UpdateTestScoreDto,

} from "../../domain";

export class TestScoreDataSourceImpl implements TestScoreDataSource {
    create(dto: CreateTestScoreDto): Promise<TestScoreEntity> {
        throw new Error("Method not implemented.");
    }
    get(dto: GetTestScoreDto): Promise<object> {
        throw new Error("Method not implemented.");
    }
    update(dto: UpdateTestScoreDto): Promise<TestScoreEntity> {
        throw new Error("Method not implemented.");
    }
}
