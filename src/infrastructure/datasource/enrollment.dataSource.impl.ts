import { prisma } from "../../data/postgres";
import {
  EnrollmentStatus,
  UpdateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  CreateEnrollmentDto,
  DeleteEnrollmentDto,
  GetEnrollmentDto,
  GetAcademicStatusDto,
  EnrollmentGetInterface,
  GetStageOfSeminarianDto,
  EnrollmentTestResult,
  stages,
} from "../../domain";

import { EnrollmentSubjectFilter } from "./utils/subjectEnrollmentFilter";
import { GetStageOfSeminarianMap } from "./utils/getStageOfSeminarianFilter";
import { calculateTestScore } from "./utils/calculateScore";
import { calculateStageStatus, AllEnrollmentBySeminarian } from "./utils/calculateIfSeminarianApproveStage";
export class EnrollmentDataSourceImpl implements EnrollmentDataSource {
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

    return await calculateStageStatus.calculateIfSeminarianApproveStage(allEnrollmentBySeminarian);
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
