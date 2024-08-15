import { prisma } from "../../data/postgres";
import {
  CreateTestDto,
  GetTestDto,
  TestDataSource,
  TestEntity,
  UpdateTestDto,
} from "../../domain";

export class TestDataSourceImpl implements TestDataSource {
  async create(dto: CreateTestDto): Promise<TestEntity> {
    throw new Error("Method not implemented.");
  }
  async get(dto: GetTestDto): Promise<object> {
    const test = await prisma.test.findMany({
      /*where: {
        id: dto.id,
        subject_id: dto.subject_id,
        status: dto.status,
        academic_term_id: dto.academic_term_id,
      },*/
      include: { test_score: {include: {enrollment: true}} },
    });

    const test1 = await prisma.enrollment.findMany({include: {test_score: {include: {test: true}}}})

    console.log({ test1 });

    return test1;
  }
  async update(dto: UpdateTestDto): Promise<TestEntity> {
    throw new Error("Method not implemented.");
  }
  async delete(id: number): Promise<TestEntity> {
    throw new Error("Method not implemented.");
  }
}
