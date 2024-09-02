import {
  TestRepository,
  TestDataSource,
  CreateTestDto,
  GetTestDto,
  TestEntity,
  UpdateTestDto,
  GetTestBySubjectDto,
  EnrollmentTestResult,
  GetTestForTestScoreDto,
  TestForTestScoreResult,
  GetAverageGradeBySubjectDto,
} from "../../domain";

export class TestRepositoryImpl implements TestRepository {
  constructor(private readonly dataSource: TestDataSource) {}
  getAverageGradeBySubject(dto: GetAverageGradeBySubjectDto): Promise<object[]> {
    return this.dataSource.getAverageGradeBySubject(dto);
  }
  getTestForTestScore(dto: GetTestForTestScoreDto): Promise<TestForTestScoreResult> {
    return this.dataSource.getTestForTestScore(dto);
  }
  getTestBySubject(dto: GetTestBySubjectDto): Promise<EnrollmentTestResult[]> {
    return this.dataSource.getTestBySubject(dto);
  }
  create(dto: CreateTestDto): Promise<object> {
    return this.dataSource.create(dto);
  }
  get(dto: GetTestDto): Promise<object> {
    return this.dataSource.get(dto);
  }
  update(dto: UpdateTestDto): Promise<TestEntity> {
    return this.dataSource.update(dto);
  }
  delete(id: number): Promise<TestEntity> {
    return this.dataSource.delete(id);
  }
}
