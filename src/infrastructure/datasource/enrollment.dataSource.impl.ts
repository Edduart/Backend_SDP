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
} from "../../domain";

import { EnrollmentSubjectFilter } from "./utils/subjectEnrollmentFilter";
export class EnrollmentDataSourceImpl implements EnrollmentDataSource {
  async getAcademicStatus(GetDto: GetAcademicStatusDto): Promise<object> {
    const academicStatus = await prisma.enrollment.findMany({
      where: { seminarian_id: GetDto.seminarian_id },
      include: { subject: { include: { course: true } } },
    });

    const subjectsToEnroll = EnrollmentSubjectFilter.subjectFilter(
      academicStatus,
      GetDto.seminarian_id!
    );

    console.log(typeof academicStatus); // this is a object
    console.log(academicStatus);

    return subjectsToEnroll;
  }
  async create(createDto: CreateEnrollmentDto): Promise<object> {
    //await this.validateExistence(createDto);
    const createEnrollment = await prisma.enrollment.createMany({
      data: createDto.subject_id.map((subjectId) => ({
        seminarian_id: createDto.seminarian_id,
        subject_id: subjectId,
        academic_term_id: createDto.academic_term_id,
      })),
    });
    console.log("🚀 ~ EnrollmentDataSourceImpl ~ create ~ createEnrollment:", createEnrollment)
    return createEnrollment;
  }

  async get(getDto: GetEnrollmentDto): Promise<EnrollmentEntity[]> {
    //TODO add filters
    const enrollment = await prisma.enrollment.findMany();
    return enrollment.map((enrollment) =>
      EnrollmentEntity.fromObject(enrollment)
    );
  }

  async update(updateDto: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
    /*const subjectCheck = await prisma.enrollment.findFirst({
      where: { subject_id: updateDto.subject_id },
    });

    if (subjectCheck != null)
      throw `Enrollment of the subject ID: ${updateDto.subject_id}, already exist`;*/

    const updateEnrollment = await prisma.enrollment.update({
      where: {
        seminarian_id: updateDto.seminarian_id,
        subject_id: updateDto.subject_id,
        academic_term_id: updateDto.academic_term_id,
      },
      data: {
        academic_term_id: updateDto.academic_term_id,
        status: updateDto.status,
      },
    });
    return EnrollmentEntity.fromObject(updateEnrollment);
  }

  async delete(DeleteDto: DeleteEnrollmentDto): Promise<EnrollmentEntity> {
    const deleteEnrollment = await prisma.enrollment.update({
      where: {
        seminarian_id: DeleteDto.seminarian_id,
        subject_id: DeleteDto.subject_id,
        academic_term_id: DeleteDto.academic_term_id,
      },
      data: { status: "RETIRADO" },
    });
    return EnrollmentEntity.fromObject(deleteEnrollment);
  }

  async validateExistence(dto: DtoValidate) {
    const [enrollment, seminarian, subject, academicTerm = true] =
      await Promise.all([
        // FIXME need to update database check for academic term error
        prisma.enrollment.findMany({
          where: {
            seminarian_id: dto.seminarian_id,
            subject_id: dto.subject_id,
            academic_term_id: dto.academic_term_id,
          },
        }),
        prisma.seminarian.findUnique({ where: { id: dto.seminarian_id } }),
        prisma.subject.findUnique({
          where: { id: dto.subject_id, status: true },
        }),
        /*prisma.academic_term.findUnique({
        where: { id: dto.academic_term_id },
      }),*/
      ]);
    if (enrollment)
      throw `Enrollment with the seminarian ID: ${dto.seminarian_id} , subject ID: ${dto.subject_id} , academic term ID: ${dto.academic_term_id}, already exist`;
    if (!seminarian) throw `Seminarian ID ${dto.seminarian_id} doesn't exist!`;
    if (!subject) throw `Subject ID ${dto.subject_id} doesn't exist!`;
    if (!academicTerm)
      throw `Academic term ID ${dto.academic_term_id} doesn't exist!`;
  }
}

interface DtoValidate {
  seminarian_id?: string;
  subject_id?: number;
  academic_term_id?: number;
  status?: string;
}
