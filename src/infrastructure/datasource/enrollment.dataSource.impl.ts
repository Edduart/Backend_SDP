import { prisma } from "../../data/postgres";
import { DeleteEnrollment } from "../../domain/useCases/enrollment/deleteEnrollment";
import {
  UpdateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  CreateEnrollmentDto,
} from "../../domain";

export class EnrollmentDataSourceImpl implements EnrollmentDataSource {
  async create(createDto: CreateEnrollmentDto): Promise<EnrollmentEntity> {
    const subjectCheck = await prisma.enrollment.findFirst({
      where: { subject_id: createDto.subject_id },
    });
    if (subjectCheck != null)
      throw `Enrollment of the subject ID: ${createDto.subject_id}, already exist`;
    const createEnrollment = await prisma.enrollment.create({
      data: createDto!,
    });
    return EnrollmentEntity.fromObject(createEnrollment);
  }

  async get(): Promise<EnrollmentEntity[]> {
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
      where: { subject_id: updateDto.subject_id },
      data: {
        academic_term_id: updateDto.academic_term_id,
        status_id: updateDto.status_id,
      },
    });
    return EnrollmentEntity.fromObject(updateEnrollment);
  }

  async delete(id: number): Promise<EnrollmentEntity> {
    const deleteEnrollment = await prisma.enrollment.update({
      where: { subject_id: id },
      data: { status_id: 0 },
    });
    return EnrollmentEntity.fromObject(deleteEnrollment);
  }
}
