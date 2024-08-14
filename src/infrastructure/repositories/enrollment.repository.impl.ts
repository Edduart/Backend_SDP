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
} from "../../domain";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  constructor(private readonly dataSource: EnrollmentDataSource) {}
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
  delete(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity> {
    return this.dataSource.delete(dto);
  }
}
