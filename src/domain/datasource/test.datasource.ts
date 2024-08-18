import { TestEntity } from "../entities";
import {
  CreateTestDto,
  GetTestDto,
  UpdateTestDto,
  GetTestBySubjectDto,
  EnrollmentTestResult,
} from "../dtos";

export abstract class TestDataSource {
  abstract create(dto: CreateTestDto): Promise<object>;
  abstract get(dto: GetTestDto): Promise<object>;
  abstract getTestBySubject(
    dto: GetTestBySubjectDto
  ): Promise<EnrollmentTestResult[]>;
  abstract update(dto: UpdateTestDto): Promise<TestEntity>;
  abstract delete(id: number): Promise<TestEntity>;
}
