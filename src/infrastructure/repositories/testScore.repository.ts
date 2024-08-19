import { TestScoreRepository, TestScoreDataSource, CreateTestScoreDto, GetTestScoreDto, TestScoreEntity, UpdateTestScoreDto } from "../../domain";

export class TestScoreRepositoryImpl implements TestScoreRepository {
  constructor(private readonly dataSource: TestScoreDataSource) {}
  create(dto: CreateTestScoreDto): Promise<object> {
    return this.dataSource.create(dto);
  }
  get(dto: GetTestScoreDto): Promise<object> {
    return this.dataSource.get(dto);
  }
  update(dto: UpdateTestScoreDto): Promise<TestScoreEntity> {
    return this.dataSource.update(dto);
  }
}
