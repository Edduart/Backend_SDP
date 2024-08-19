import { TestEntity } from "../entities";
import {
  CreateTestDto,
  GetTestDto,
  UpdateTestDto,
  GetTestBySubjectDto,
  EnrollmentTestResult,
  GetTestForTestScoreDto,
  TestForTestScoreResult,
} from "../dtos";

export abstract class TestRepository {
  abstract create(dto: CreateTestDto): Promise<object>;
  abstract get(dto: GetTestDto): Promise<object>;
  abstract getTestBySubject(
    dto: GetTestBySubjectDto
  ): Promise<EnrollmentTestResult[]>;
  abstract getTestForTestScore(
    dto: GetTestForTestScoreDto
  ): Promise<TestForTestScoreResult>;
  abstract update(dto: UpdateTestDto): Promise<TestEntity>;
  abstract delete(id: number): Promise<TestEntity>;
}
