import { EnrollmentEntity } from "../entities";
import {
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
  GetEnrollmentDto,
  DeleteEnrollmentDto,
  GetAcademicStatusDto,
  EnrollmentGetInterface,
  GetStageOfSeminarianDto,
  CreateEnrollmentByEquivalenceDto,
  SubjectAllowToEnrollEquivalencyDto,
  SubjectAllowToEnrollEquivalency
} from "../dtos";

export abstract class EnrollmentRepository {
  abstract create(dto: CreateEnrollmentDto): Promise<object>;
  abstract createByEquivalence(
    dto: CreateEnrollmentByEquivalenceDto
  ): Promise<object>;
  abstract get(dto: GetEnrollmentDto): Promise<EnrollmentGetInterface[]>;
  abstract getAcademicStatus(dto: GetAcademicStatusDto): Promise<object>;
  abstract getStageOfSeminarian(dto: GetStageOfSeminarianDto): Promise<object>;
  abstract getSubjectsToEnroll(
    dto: SubjectAllowToEnrollEquivalencyDto
  ): Promise<SubjectAllowToEnrollEquivalency>;
  abstract update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract delete(id: number): Promise<EnrollmentEntity>;
  abstract updateStatusByFinalSubjectScore(): Promise<object>;
  abstract updateStageIfApproved(): Promise<object>;
}
