import { prisma } from "../../data/postgres";
import {
  CreateTestDto,
  GetTestDto,
  TestDataSource,
  TestEntity,
  UpdateTestDto,
  GetTestBySubjectDto,
  GetTestBySubject,
} from "../../domain";

import { calculateTestScore } from "./utils/calculateScore";

export class TestDataSourceImpl implements TestDataSource {
  async getTestBySubject(dto: GetTestBySubjectDto): Promise<object> {
    const testScoreBySubject = await prisma.enrollment.findMany({
      where: {
        seminarian_id: dto.seminarian_id,
        academic_term_id: dto.academic_term_id,
        subject_id: dto.subject_id,
        enrollment_id: dto.enrollment_id,
      },
      include: {
        subject: { select: { description: true } },
        seminarian: {
          select: {
            user: {
              select: { person: { select: { surname: true, forename: true } } },
            },
          },
        },
        test_score: { include: { test: true } },
      },
    });

    testScoreBySubject.map((test) => test.subject.description);

    const testScoreCalculated =
      calculateTestScore.calculateTestScoreFromSubject(testScoreBySubject);

    return testScoreCalculated;
  }
  async create(dto: CreateTestDto): Promise<TestEntity> {
    const [instruction, enrollment, subject, academicTerm] = await Promise.all([
      await prisma.instruction.findFirst({
        where: {
          subject_id: dto.subject_id,
          academic_term_id: dto.academic_term_id,
        },
      }),
      prisma.enrollment.findMany({
        where: {
          subject_id: dto.subject_id,
          academic_term_id: dto.academic_term_id,
        },
      }),
      prisma.subject.findUnique({
        where: { id: dto.subject_id },
      }),
      prisma.academic_term.findUnique({
        where: { id: dto.academic_term_id },
      }),
    ]);

    console.log({ enrollment });

    if (!enrollment)
      throw `Enrollment with subject ID: ${dto.subject_id} , academic term ID: ${dto.academic_term_id}, doesn't exist`;
    if (!instruction)
      throw `Instruction with ${dto.subject_id} and academic term ID: ${dto.academic_term_id}, doesn't exist`;
    if (!subject) throw `Subject ID ${dto.subject_id} doesn't exist!`;
    if (!academicTerm)
      throw `Academic term ID ${dto.academic_term_id} doesn't exist!`;

    const createTestTransaction = await prisma.$transaction(async (tx) => {
      
      const createTest = await tx.test.create({
        data: {
          subject_id: dto.subject_id,
          academic_term_id: dto.academic_term_id,
          maximum_score: dto.maximum_score,
          description: dto.description,
        },
      });

      const checkTest = await prisma.test.findMany()

      console.log({checkTest});

      const createAllTestScore = await tx.test_score.createMany({
        data: enrollment.map((subject) => ({
          test_id: createTest.id,
          enrollment_id: subject.enrollment_id,
          seminarian_id: subject.seminarian_id,
          score: 0,
        })),
      });
      
      return createTest;
    });

    return TestEntity.fromObject(createTestTransaction);
  }
  async get(dto: GetTestDto): Promise<object> {
    const test = await prisma.test.findMany({
      /*where: {
        id: dto.id,
        subject_id: dto.subject_id,
        status: dto.status,
        academic_term_id: dto.academic_term_id,
      },*/
      include: { test_score: { include: { enrollment: true } } },
    });

    const test1 = await prisma.enrollment.findMany({
      include: { test_score: { include: { test: true } } },
    });

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
