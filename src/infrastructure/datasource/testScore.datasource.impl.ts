import test from "node:test";
import { prisma } from "../../data/postgres";
import {
  CreateTestScoreDto,
  GetTestScoreDto,
  TestScoreDataSource,
  TestScoreEntity,
  UpdateTestScoreDto,
} from "../../domain";

export class TestScoreDataSourceImpl implements TestScoreDataSource {
  async create(dto: CreateTestScoreDto): Promise<object> {
    await this.validateExist(dto.enrollmentIds, dto.testIds);

    const createTestScore = await prisma.test_score.createMany({
      data: dto.tests,
      skipDuplicates: true,
    });

    return createTestScore;
  }
  async get(dto: GetTestScoreDto): Promise<object> {
    const testScore = await prisma.test_score.findMany({
      where: { test_id: dto.test_id, enrollment_id: dto.enrollment_id },
      include: {
        enrollment: {
          select: {
            seminarian: {
              select: {
                user: {
                  select: {
                    person: {
                      select: { id: true, forename: true, surname: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return testScore;
  }
  update(dto: UpdateTestScoreDto): Promise<TestScoreEntity> {
    throw new Error("Method not implemented.");
  }

  private async validateExist(enrollmentIds: number[], testIds: number[]) {
    const [enrollment, test] = await Promise.all([
      await prisma.enrollment.findMany({
        where: { enrollment_id: { in: enrollmentIds } },
      }),
      await prisma.test.findMany({
        where: { id: { in: testIds } },
      }),
    ]);

    if (enrollment.length !== enrollmentIds.length)
      throw "one or more enrollment_id doesn't exist";
    if (test.length !== testIds.length)
      throw "one or more test_id doesn't exist";
  }
}
