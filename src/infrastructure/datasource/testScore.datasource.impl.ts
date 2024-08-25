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
  async update(dto: UpdateTestScoreDto): Promise<object> {

    let count: number = 0;
    let updateTest: object = {}

    for (const test of Object.values(dto.tests)) {
      await prisma.test_score.updateMany({
        where: {
          enrollment_id: test.enrollment_id,
          test_id: test.test_id,
        },
        data: {
          score: test.score,
        },
      });
      count++;
    }

    updateTest = { count };

    return updateTest;
  }

  private async validateExist(enrollmentIds: number[], testIds: number[]) {
    const [enrollment, test, test_score] = await Promise.all([
      await prisma.enrollment.findMany({
        where: { enrollment_id: { in: enrollmentIds } },
      }),
      await prisma.test.findMany({
        where: { id: { in: testIds } },
      }),
      await prisma.test_score.findMany({
        where: {
          AND: [
            { enrollment_id: { in: enrollmentIds } },
            { test_id: { in: testIds } },
          ],
        },
      }),
    ]);

    console.log("test score check", { test_score }); // if is necessary to check this in both update or create?

    if (enrollment.length !== enrollmentIds.length)
      throw "one or more enrollment_id doesn't exist";
    if (test.length !== testIds.length)
      throw "one or more test_id doesn't exist";
  }
}
