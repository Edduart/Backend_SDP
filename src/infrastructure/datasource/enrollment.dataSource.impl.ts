import { prisma } from "../../data/postgres";
import {
  EnrollmentStatus,
  UpdateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  CreateEnrollmentDto,
  GetEnrollmentDto,
  GetAcademicStatusDto,
  EnrollmentGetInterface,
  GetStageOfSeminarianDto,
  stages,
  CreateEnrollmentByEquivalenceDto,
  SubjectAllowToEnrollEquivalency,
  SubjectAllowToEnrollEquivalencyDto,
  GetAcademicTermByEnrollmentDto,
  academicTermMap,
} from "../../domain";

import { EnrollmentSubjectFilter } from "./utils/subjectEnrollmentFilter";
import { GetStageOfSeminarianMap } from "./utils/getStageOfSeminarianFilter";
import { calculateTestScore } from "./utils/calculateScore";
import {
  calculateStageStatus,
  AllEnrollmentBySeminarian,
} from "./utils/calculateIfSeminarianApproveStage";

import { formatDate } from "../../presentation/utils/formatDate";

export class EnrollmentDataSourceImpl implements EnrollmentDataSource {
  
  async ContarEnrolls(): Promise<number> {
    const result = await prisma.enrollment.count({
      where:{
        status: EnrollmentStatus.CURSANDO
      }
    })
    return result
  }

  async getAcademicTermByEnrollment(
    dto: GetAcademicTermByEnrollmentDto
  ): Promise<academicTermMap[]> {
    console.log(dto.seminarian_id);
    const seminarianAcademicTerm = await prisma.seminarian.findMany({
      where: {
        id: dto.seminarian_id,
        enrollment: { some: { seminarian_id: dto.seminarian_id } },
      },
      select: { id: true, enrollment: { include: { academic_term: true } } },
    });

    console.log(seminarianAcademicTerm);

    const removeRepeated = seminarianAcademicTerm.map((seminarian) => {
      const seenIds = new Set();
      return {
        seminarian: seminarian.id,
        enrollment: seminarian.enrollment.filter((enrollment) => {
          const id = enrollment.academic_term.id;
          if (!seenIds.has(id)) {
            seenIds.add(id);
            return true;
          }
          return false;
        }),
      };
    });

    console.log(removeRepeated);

    const academicTermMap: academicTermMap[] = removeRepeated.flatMap(
      (seminarian) => ({
        seminarian_id: seminarian.seminarian,
        academic_term: seminarian.enrollment.map((enrollment) => ({
          academic_term_id: enrollment.academic_term.id,
          academic_term_semester: enrollment.academic_term.semester,
          academic_term_start_date: formatDate(
            enrollment.academic_term.start_date.toISOString()
          ),
          academic_term_end_date: formatDate(
            enrollment.academic_term.end_date.toISOString()
          ),
          academic_term_status: enrollment.academic_term.status,
        })),
      })
    );

    console.log(academicTermMap);

    return academicTermMap;
  }
  async getSubjectsToEnroll(
    dto: SubjectAllowToEnrollEquivalencyDto
  ): Promise<SubjectAllowToEnrollEquivalency> {
    const checkSeminarian = await prisma.seminarian.findUnique({
      where: { id: dto.seminarian_id },
    });

    if (!checkSeminarian)
      throw `seminarian ID: ${dto.seminarian_id} does'nt exist`;
    const academicStatus = await prisma.enrollment.findMany({
      where: {
        seminarian_id: dto.seminarian_id,
        NOT: {
          OR: [{ status: "REPROBADO" }, { status: "RETIRADO" }],
        },
      },
      include: { subject: { include: { course: true } } },
    });

    console.log("after prisma consult: ", academicStatus);

    const subjectsToEnroll: SubjectAllowToEnrollEquivalency =
      await EnrollmentSubjectFilter.subjectFilterForEquivalency(
        academicStatus,
        dto.seminarian_id!
      );

    return subjectsToEnroll;
  }
  async createByEquivalence(
    dto: CreateEnrollmentByEquivalenceDto
  ): Promise<object> {
    const equivalenceTransactionResult = prisma.$transaction(async (tx) => {
      const checkSeminarian = await tx.seminarian.findUnique({
        where: { id: dto.seminarian_id },
      });

      const checkIfAlreadyEnroll = await prisma.enrollment.findMany({
        where: {
          AND: [
            { seminarian_id: dto.seminarian_id },
            { subject_id: dto.subject_id },
            { OR: [{ status: "APROBADO" }, { status: "CURSANDO" }] },
          ],
        },
      });

      if (checkIfAlreadyEnroll.length > 0)
        throw `seminarian id ${dto.seminarian_id} is already enrolled in the subject or was already approved`;
      if (!checkSeminarian)
        throw `seminarian id ${dto.seminarian_id} does't exist`;

      const equivalenceAcademicTerm = await tx.academic_term.findFirst({
        where: { status: "EQUIVALENCIAS" },
      });
      if (!equivalenceAcademicTerm)
        throw "there is a error with the academic term EQUIVALENCIAS";

      const enroll = await tx.enrollment.create({
        data: {
          seminarian_id: dto.seminarian_id,
          subject_id: dto.subject_id,
          academic_term_id: equivalenceAcademicTerm.id,
          status: "APROBADO",
        },
      });

      const equivalenceTest = await tx.test.findFirst({
        where: { subject_id: dto.subject_id },
      });

      if (!equivalenceTest)
        throw `there is a error with the equivalence test ${dto.subject_id}, it is no found!`;
      const testScore = await tx.test_score.create({
        data: {
          test_id: equivalenceTest.id,
          enrollment_id: enroll.enrollment_id,
          score: dto.subject_score,
        },
      });

      console.log("all okay in equivalency transaction");

      return { equivalenceAcademicTerm, enroll, testScore };
    });

    return equivalenceTransactionResult;
  }
  async updateStageIfApproved(): Promise<object> {
    const allEnrollmentBySeminarian: AllEnrollmentBySeminarian[] =
      await prisma.seminarian.findMany({
        where: {
          AND: [
            { status: "ACTIVO" },
            { enrollment: { some: { status: "APROBADO" } } },
          ],
        },
        select: {
          id: true,
          stage: true,
          enrollment: { where: { status: "APROBADO" } },
        },
      });

    console.log(JSON.stringify(allEnrollmentBySeminarian));
    console.log({ allEnrollmentBySeminarian });

    return await calculateStageStatus.calculateIfSeminarianApproveStage(
      allEnrollmentBySeminarian
    );
  }
  async updateStatusByFinalSubjectScore(): Promise<object> {
    const testScoreBySubject = await prisma.enrollment.findMany({
      where: {
        AND: [{ academic_term: { status: "ACTIVO" } }, { status: "CURSANDO" }],
      },
      include: {
        subject: { select: { description: true } },
        seminarian: {
          select: {
            user: {
              select: {
                person: { select: { surname: true, forename: true } },
              },
            },
          },
        },
        test_score: { include: { test: true } },
        academic_term: {
          select: { start_date: true, end_date: true, status: true },
        },
      },
    });
    return await calculateTestScore.calculateFinalSubjectScore(
      testScoreBySubject
    );
  }

  async getStageOfSeminarian(dto: GetStageOfSeminarianDto): Promise<object> {
    const queryStage = stages[dto.stage as keyof typeof stages];
    const seminarians = await prisma.seminarian.findMany({
      where: { AND: [{ status: "ACTIVO" }, { stage: queryStage }] },
      select: {
        id: true,
        stage: true,
        user: {
          select: { person: { select: { forename: true, surname: true } } },
        },
      },
    });
    return GetStageOfSeminarianMap.mapResult(seminarians);
  }

  async getAcademicStatus(getDto: GetAcademicStatusDto): Promise<object> {
    const checkSeminarian = await prisma.seminarian.findUnique({
      where: { id: getDto.seminarian_id },
    });

    if (!checkSeminarian)
      throw `seminarian ID: ${getDto.seminarian_id} does'nt exist`;
    const academicStatus: SeminarianStatus[] = await prisma.enrollment.findMany(
      {
        where: {
          OR: [
            {
              seminarian_id: getDto.seminarian_id,
              NOT: { OR: [{ status: "REPROBADO" }, { status: "RETIRADO" }] },
            },
            {
              AND: [
                { academic_term: { status: "ACTIVO" } },
                { status: "RETIRADO" },
              ],
            },
          ],
        },
        include: { subject: { include: { course: true } } },
      }
    );

    console.log("after prisma consult: ", academicStatus);

    const subjectsToEnroll = await EnrollmentSubjectFilter.subjectFilter(
      academicStatus,
      getDto.seminarian_id!
    );

    /*academicStatus.map((item) => {
      if (item.status != "CURSANDO") console.log(item.subject_id)});*/
    //academicStatus.map(item => item.subject_id)

    /*console.log(typeof academicStatus); // this is a object
    console.log(academicStatus);*/

    return subjectsToEnroll;
  }
  async create(createDto: CreateEnrollmentDto): Promise<object> {
    await this.validateExistence(createDto);
    const createEnrollment = await prisma.enrollment.createMany({
      data: createDto.subject_id.map((subjectId) => ({
        seminarian_id: createDto.seminarian_id,
        subject_id: subjectId,
        academic_term_id: createDto.academic_term_id,
      })),
    });
    console.log(
      "🚀 ~ EnrollmentDataSourceImpl ~ create ~ createEnrollment:",
      createEnrollment
    );
    return createEnrollment;
  }

  async get(getDto: GetEnrollmentDto): Promise<EnrollmentGetInterface[]> {
    const enrollment = await prisma.enrollment.findMany({
      where: {
        seminarian_id: getDto.seminarian_id,
        academic_term_id: getDto.academic_term_id,
        status: getDto.status,
        subject_id: getDto.subject_id,
        enrollment_id: getDto.enrollment_id,
      },
      include: {
        subject: { select: { id: true, description: true } },
        academic_term: {
          select: { id: true, start_date: true, end_date: true, status: true },
        },
      },
    });
    const enrollmentResponse = await GetEnrollmentDto.getResponse(enrollment);

    console.log({ enrollmentResponse });
    return enrollmentResponse;
  }

  async update(updateDto: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
    //await this.validateExistence(updateDto!);
    const updateEnrollment = await prisma.enrollment.update({
      where: {
        enrollment_id: updateDto.enrollment_id,
      },
      data: {
        status: updateDto.status as EnrollmentStatus,
      },
    });
    return EnrollmentEntity.fromObject(updateEnrollment);
  }

  async delete(id: number): Promise<EnrollmentEntity> {
    //await this.validateExistence(DeleteDto!, true);
    const deleteEnrollment = await prisma.enrollment.update({
      where: {
        enrollment_id: id,
      },
      data: { status: "RETIRADO" },
    });
    return EnrollmentEntity.fromObject(deleteEnrollment);
  }

  async validateExistence(dto: DtoValidate, skip?: boolean) {
    // FIXME need to fix because of db change
    const [enrollment, seminarian, subject, academicTerm] = await Promise.all([
      await prisma.enrollment.findMany({
        where: {
          seminarian_id: dto.seminarian_id,
          subject_id: {
            in: dto.subject_id,
          },
          academic_term_id: dto.academic_term_id,
          status: dto?.status,
        },
      }),
      prisma.seminarian.findUnique({ where: { id: dto.seminarian_id } }),
      prisma.subject.findMany({
        where: { id: { in: dto.subject_id }, status: true },
      }),
      prisma.academic_term.findUnique({
        where: { id: dto.academic_term_id },
      }),
    ]);
    if (skip == undefined && enrollment.length > 0)
      throw `Enrollment with the seminarian ID: ${dto.seminarian_id} , subject ID: ${dto.subject_id} , academic term ID: ${dto.academic_term_id}, already exist`;
    if (skip == true && enrollment.length == 0)
      throw `Enrollment with the seminarian ID: ${dto.seminarian_id} , subject ID: ${dto.subject_id} , academic term ID: ${dto.academic_term_id}, doesn't exist`;
    if (!seminarian) throw `Seminarian ID ${dto.seminarian_id} doesn't exist!`;
    if (subject.length == 0)
      throw `Subject ID ${dto.subject_id} doesn't exist!`;
    if (!academicTerm)
      throw `Academic term ID ${dto.academic_term_id} doesn't exist!`;
  }
}

interface DtoValidate {
  seminarian_id?: string;
  subject_id?: Array<number>;
  academic_term_id?: number;
  status?: EnrollmentStatus;
}

export interface SeminarianStatus {
  seminarian_id: string;
  subject_id: number;
  academic_term_id: number;
  status: string;
  subject: {
    id: number;
    course_id: number;
    description: string;
    status: boolean;
    precedent: number | null;
    semester: number;
    academic_field_id: number;
    course: object;
  };
}
[];
