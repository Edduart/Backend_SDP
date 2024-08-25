import { prisma } from "../../data/postgres";
import {
  CreateTestDto,
  GetTestDto,
  TestDataSource,
  TestEntity,
  UpdateTestDto,
  GetTestBySubjectDto,
  GetTestBySubject,
  EnrollmentTestResult,
  GetTestForTestScoreDto,
  TestForTestScoreResult,
} from "../../domain";

import { calculateTestScore } from "./utils/calculateScore";

export class TestDataSourceImpl implements TestDataSource {
  async getTestForTestScore(
    dto: GetTestForTestScoreDto
  ): Promise<TestForTestScoreResult> {
    console.log({ dto });

    const testsResult = await prisma.test.findMany({
      where: {
        AND: [
          { subject_id: dto.subject_id },
          { academic_term_id: dto.academic_term_id },
          { status: true },
        ],
      },
      select: { id: true, description: true, maximum_score: true },
    });

    const seminariansResult = await prisma.enrollment.findMany({
      where: {
        AND: [
          { subject_id: dto.subject_id },
          { academic_term_id: dto.academic_term_id },
          { status: "CURSANDO" },
        ],
      },
      include: {
        test_score: { select: { test_id: true, score: true } },
        seminarian: {
          select: {
            user: {
              select: { person: { select: { forename: true, surname: true } } },
            },
          },
        },
      },
    });

    const resultMap: TestForTestScoreResult = {
      tests: testsResult.map((test) => ({
        id: test.id,
        description: test.description,
        maximum_score: Number(test.maximum_score.toFixed(2)),
      })),

      seminarians: seminariansResult.map((seminarians: any) => ({
        enrollment_id: seminarians.enrollment_id,
        seminarian_id: seminarians.seminarian_id,
        seminarian_surname: seminarians.seminarian.user.person.forename,
        seminarian_forename: seminarians.seminarian.user.person.surname,
        test_score: seminarians.test_score.map((test_score: any) => ({
          test_id: test_score.test_id,
          score: test_score.score,
        })),
      })),
    };

    return resultMap;
  }

  async getTestBySubject(
    dto: GetTestBySubjectDto
  ): Promise<EnrollmentTestResult[]> {
    console.log(dto);
    const testScoreBySubject = await prisma.enrollment.findMany({
      where: {
        seminarian_id: dto.seminarian_id,
        academic_term_id: dto.academic_term_id,
        subject_id: dto.subject_id,
        enrollment_id: dto.enrollment_id,
        status: dto.status,
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
        academic_term: {
          select: { start_date: true, end_date: true, status: true },
        },
      },
    });
    testScoreBySubject.map((test) => test.subject.description);
    const testScoreCalculated: EnrollmentTestResult[] =
      await calculateTestScore.calculateTestScoreFromSubject(
        testScoreBySubject
      );
    return testScoreCalculated;
  }
  async create(dto: CreateTestDto): Promise<object> {
    const enrollment = await this.validateExistAndReturnEnrollment(dto);

    const testExistingQuantity = await prisma.test.findMany({
      where: {
        subject_id: dto.subject_id,
        academic_term_id: dto.academic_term_id,
        status: true,
      },
      select: { maximum_score: true },
    });

    //await this.calculateMaxTestConstrain(testExistingQuantity, dto); FIXME

    const createTest = await prisma.test.createMany({
      data: dto.tests.map((tests) => ({
        subject_id: dto.subject_id,
        academic_term_id: dto.academic_term_id,
        maximum_score: tests.maximum_score,
        description: tests.description,
      })),
    });

    return createTest;
  }
  async get(dto: GetTestDto): Promise<object> {
    const test = await prisma.test.findMany({
      where: {
        id: dto.id,
        subject_id: dto.subject_id,
        status: dto.status,
        academic_term_id: dto.academic_term_id,
      },
    });
    return test;
  }
  async update(dto: UpdateTestDto): Promise<TestEntity> {
    const test = await prisma.test.update({
      where: { id: dto.id },
      data: dto.values!,
    });
    return TestEntity.fromObject(test);
  }
  async delete(id: number): Promise<TestEntity> {

    const checkIfHaveTestScore = await prisma.test_score.findMany({where:{test_id: id}});

    if (checkIfHaveTestScore.length > 0) throw `cannot delete a test if already have seminarians with this test added!`

      const test = await prisma.test.update({
        where: { id: id },
        data: { status: false },
      });

    console.log(test);

    return TestEntity.fromObject(test);
  }

  private async validateExistAndReturnEnrollment(dto: CreateTestDto) {
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
    if (!enrollment)
      throw `Enrollment with subject ID: ${dto.subject_id} , academic term ID: ${dto.academic_term_id}, doesn't exist`;
    if (!instruction)
      throw `Instruction with ${dto.subject_id} and academic term ID: ${dto.academic_term_id}, doesn't exist`;
    if (!subject) throw `Subject ID ${dto.subject_id} doesn't exist!`;
    if (!academicTerm)
      throw `Academic term ID ${dto.academic_term_id} doesn't exist!`;
    return enrollment;
  }

  /*private async calculateMaxTestConstrain(
    testExistingQuantity: any[],
    dto: CreateTestDto
  ) {
    console.log(testExistingQuantity.length);

    let testMaxScoreCounter = 0;

    let testCounter;

    for (
      testCounter = 0;
      testCounter <= testExistingQuantity.length;
      testCounter++
    ) {
      console.log({ testCounter });

      if (testCounter == 6) {
        throw `there are already ${testCounter} you cannot create more than 6 assignments`;
      }

      if (testCounter == testExistingQuantity.length) break;
      testMaxScoreCounter += Number(
        testExistingQuantity[testCounter].maximum_score.toFixed(2)
      );
    }

    const allTestMaxScore = testMaxScoreCounter + dto.maximum_score;

    console.log(allTestMaxScore);

    if (allTestMaxScore > 100)
      throw `the sum of the created assignments is greater than 100, already created assignments ${testMaxScoreCounter}, new assignments ${dto.maximum_score}, total out of: ${allTestMaxScore}`;
    if (testCounter == 5 && allTestMaxScore != 100)
      throw `the sum of all the assignments need to be 100, new assignments ${dto.maximum_score}, total out of: ${allTestMaxScore}`;

    console.log(testMaxScoreCounter);
  }*/
}
