import {
  CreateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  EnrollmentRepository,
  UpdateEnrollmentDto,
  DeleteEnrollmentDto,
  GetEnrollmentDto,
  GetAcademicStatusDto,
  EnrollmentGetInterface,
  GetStageOfSeminarianDto,
  CreateEnrollmentByEquivalenceDto,
  SubjectAllowToEnrollEquivalency,
  SubjectAllowToEnrollEquivalencyDto,
  GetAcademicTermByEnrollmentDto,
  academicTermMap,
  CantidadSeminaristas,
} from "../../domain";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  constructor(private readonly dataSource: EnrollmentDataSource) {}
  ContarEnrolls(): Promise<CantidadSeminaristas> {
    return this.dataSource.ContarEnrolls();
  }
  getAcademicTermByEnrollment(
    dto: GetAcademicTermByEnrollmentDto
  ): Promise<academicTermMap[]> {
    return this.dataSource.getAcademicTermByEnrollment(dto);
  }
  getSubjectsToEnroll(
    dto: SubjectAllowToEnrollEquivalencyDto
  ): Promise<SubjectAllowToEnrollEquivalency> {
    return this.dataSource.getSubjectsToEnroll(dto);
  }
  createByEquivalence(dto: CreateEnrollmentByEquivalenceDto): Promise<object> {
    return this.dataSource.createByEquivalence(dto);
  }
  updateStageIfApproved(): Promise<object> {
    return this.dataSource.updateStageIfApproved();
  }
  updateStatusByFinalSubjectScore(): Promise<object> {
    return this.dataSource.updateStatusByFinalSubjectScore();
  }
  getStageOfSeminarian(dto: GetStageOfSeminarianDto): Promise<object> {
    return this.dataSource.getStageOfSeminarian(dto);
  }
  getAcademicStatus(dto: GetAcademicStatusDto): Promise<object> {
    return this.dataSource.getAcademicStatus(dto);
  }
  create(dto: CreateEnrollmentDto): Promise<object> {
    return this.dataSource.create(dto);
  }
  get(dto: GetEnrollmentDto): Promise<EnrollmentGetInterface[]> {
    return this.dataSource.get(dto);
  }
  update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
    return this.dataSource.update(dto);
  }
  delete(id: number): Promise<EnrollmentEntity> {
    return this.dataSource.delete(id);
  }
}
