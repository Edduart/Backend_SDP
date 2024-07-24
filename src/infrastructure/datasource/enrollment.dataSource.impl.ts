import { enrollment_status } from "@prisma/client";

import { prisma } from "../../data/postgres";
import { DeleteEnrollment } from "../../domain/useCases/enrollment/deleteEnrollment";
import {
  EnrollmentStatus,
  UpdateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  CreateEnrollmentDto,
  DeleteEnrollmentDto,
  GetEnrollmentDto
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
}
