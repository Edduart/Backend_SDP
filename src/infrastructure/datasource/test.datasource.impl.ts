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
  GetAverageGradeBySubjectDto,
  GetSeminarianDTO,
  SeminarianListDTO,
} from "../../domain";

import { calculateTestScore } from "./utils/calculateScore";
import { calculateAverageGrade } from "./utils/calculateAverageGradeBySubject";
import test from 'node:test';
import { seminarian_Location, seminarian_Ministery, seminarian_status } from "@prisma/client";
export class TestDataSourceImpl implements TestDataSource {
  async GetSeminarianListWithNotes(data: GetSeminarianDTO): Promise<SeminarianListDTO[]> {
    const errolments = await this.getTestBySubject(new GetTestBySubjectDto(undefined, undefined, data.subject_id, data.academic_term_id, undefined))
    let persons: string[] = []
    let notas: number[] = []
    errolments.forEach((Element)=>{
      const result = Element.enrollment[0].subject_total_score_out_of_graded_scored_10_scale.split("/")[0]
      const notenum = Number(result);
      if(data.menor_a_la_nota){
        if(notenum <= data.note!){
          persons.push(Element.seminarian_id)
          notas.push(notenum)
        }
      }else{
        if(notenum >= data.note!){
          persons.push(Element.seminarian_id)
          notas.push(notenum)
        }
    }})
    let where_clause_foreing = undefined;
    //if the foreing clause is not undefined we pass to assing data
    if (data.foreing != undefined) {
      //if it is true i sent to select all seminarian that has foreing data
      //if it is false, i  sent to select all seminarian that has not foreing data
      where_clause_foreing = data.foreing ? { isNot: null } : { is: null };
    }
    const result_seminarian = await prisma.person.findMany({
      where:{
        id:{
          in: persons
        },user: {
          parish_id: data.parish_id,
          Role_id: 5,
          parish: {
            diocese_id: data.diocese_id,
          },
          seminarian: {
            status: data.status as seminarian_status,
            Location: data.location as seminarian_Location,
            Ministery: data.ministery as seminarian_Ministery,
            foreigner_seminarian: where_clause_foreing,
          },
        },
      },include: {
        phone_number: true,
        social_media: true,
        user: {
          include: {
            academic_degree:true,
            parish:{
              include:{
                diocese:true,
              }
            },
            seminarian: {
              include: {
                enrollment: {
                  include:{
                    subject:{
                      include:{
                        course: true
                      }
                    }
                  }
                },
                foreigner_seminarian: true,
              },
            },
          },
        },
      },
    })
    const entities: SeminarianListDTO[] = result_seminarian.map((actual)=>{
      const aux = persons.findIndex((element) => element == actual.id) 
      const number = notas[aux != undefined ? aux : 0]
      return SeminarianListDTO.fromdb({
        id: actual.id, 
        forename: actual.forename, 
        surname: actual.surname, 
        email: actual.email, 
        diocesi_name: actual.user?.parish.diocese, 
        note: number
      })
    })
    return entities;
  }
  
  async getAverageGradeBySubject(
    dto: GetAverageGradeBySubjectDto
  ): Promise<object[]> {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        academic_term_id: dto.academic_term_id,
        subject_id: dto.subject_id,
      },
      include: {
        subject: { select: { description: true } },
        test_score: { select: { score: true , test: {select:{id: true, maximum_score: true}} } },
      },
    });
    if (enrollments.length == 0) throw "The subject don't exist or don't have any enrollments";
      const subjectAverageGrade: any[] =
        await calculateAverageGrade.getAverageGradeBySubject(enrollments);
    return subjectAverageGrade;
  }
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
      seminarians: seminariansResult.map((seminarians: any) => {
        let testCounter = -1;
        return {
          enrollment_id: seminarians.enrollment_id,
          seminarian_id: seminarians.seminarian_id,
          seminarian_surname: seminarians.seminarian.user.person.forename,
          seminarian_forename: seminarians.seminarian.user.person.surname,
          test_score:
            seminarians.test_score.length == 0
              ? testsResult.map((noScoredTest) => ({
                  test_id: noScoredTest.id,
                  score: 0,
                }))
              : testsResult.map((test_score: any) => {
                  const scoredTests = seminarians.test_score.map(
                    (test: any) => test.score
                  );
                  testCounter++;
                  return {
                    test_id: test_score.id,
                    score:
                      testCounter >= scoredTests.length
                        ? 0
                        : scoredTests[testCounter],
                  };
                }),
        };
      }),
    };
    return resultMap;
  }

  async getTestBySubject(
    dto: GetTestBySubjectDto
  ): Promise<EnrollmentTestResult[]> {
    console.log(dto);
    const testScoreBySeminarian = await prisma.seminarian.findMany({
      where: {
        id: dto.seminarian_id,
        enrollment: {
          some: {
            academic_term_id: dto.academic_term_id,
            subject_id: dto.subject_id,
            enrollment_id: dto.enrollment_id,
            status: dto.status,
          },
        },
      },
      select: {
        id: true,
        user: {
          select: { person: { select: { surname: true, forename: true } } },
        },
        enrollment: {
          where: {
            academic_term_id: dto.academic_term_id,
            subject_id: dto.subject_id,
            enrollment_id: dto.enrollment_id,
            status: dto.status,
          },
          select: {
            enrollment_id: true,
            subject_id: true,
            status: true,
            subject: { select: { description: true } },
            test_score: { include: { test: true } },
            academic_term: {
              select: {
                id: true,
                start_date: true,
                end_date: true,
                status: true,
              },
            },
          },
        },
      },
    });
    const testScoreCalculated: EnrollmentTestResult[] =
      await calculateTestScore.calculateTestScoreFromSubject(
        testScoreBySeminarian
      );
    return testScoreCalculated;
  }

  async create(dto: CreateTestDto): Promise<object> {
    await this.validateExist(dto);
    const testExistingQuantity = await prisma.test.findMany({
      where: {
        subject_id: dto.subject_id,
        academic_term_id: dto.academic_term_id,
        status: true,
      },
      select: { maximum_score: true },
    });
    await this.calculateMaxTestConstrain(testExistingQuantity, dto);
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

    // FIXME can go to dto

    const resultMapping: getTestResult[] = test.map((tests) => ({
      id: tests.id,
      subject_id: tests.subject_id,
      academic_term_id: tests.academic_term_id,
      description: tests.description,
      status: tests.status,
      maximum_score: +tests.maximum_score,
    }));

    interface getTestResult {
      id: number;
      subject_id: number;
      academic_term_id: number;
      description: string;
      status: boolean;
      maximum_score: number;
    }
    [];

    return resultMapping;
  }

  async update(dto: UpdateTestDto): Promise<TestEntity> {
    const validateIfExist = await prisma.test.findUnique({
      where: { id: dto.id },
    });
    if (!validateIfExist) throw `the test id does't exist`;
    const test = await prisma.test.update({
      where: { id: dto.id },
      data: dto.values!,
    });
    return TestEntity.fromObject(test);
  }

  async delete(id: number): Promise<TestEntity> {
    const validateIfExist = await prisma.test.findUnique({
      where: { id: id },
    });
    if (!validateIfExist) throw `the test id does't exist`;
    const checkIfHaveTestScore = await prisma.test_score.findMany({
      where: { test_id: id },
    });
    if (checkIfHaveTestScore.length > 0)
      throw `cannot delete a test if already have seminarians with this test added!`;
    const test = await prisma.test.update({
      where: { id: id },
      data: { status: false },
    });
    return TestEntity.fromObject(test);
  }

  private async validateExist(dto: CreateTestDto) {
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
  }

  private async calculateMaxTestConstrain(
    testExistingQuantity: any[],
    dto: CreateTestDto
  ) {
    let maximumScoreCounter = 0;
    if (testExistingQuantity.length > 0)
      throw `There are already existing tests for this subject, you cannot create more`;
    if (dto.tests.length < 2 || dto.tests.length > 6)
      throw `the minimum tests is 2 and max 6, now is ${dto.tests.length}`;
    dto.tests.forEach((test) => {
      maximumScoreCounter += test.maximum_score;
    });
    if (maximumScoreCounter !== 100)
      throw `the sum of all test maximum score need to be 100, now is: ${maximumScoreCounter}`;
  }
}
