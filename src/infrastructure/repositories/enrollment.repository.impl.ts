import {
  CreateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  EnrollmentRepository,
  UpdateEnrollmentDto,
  DeleteEnrollmentDto,
  GetEnrollmentDto
} from "../../domain";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  constructor(private readonly dataSource: EnrollmentDataSource) {}
  create(dto: CreateEnrollmentDto): Promise<EnrollmentEntity> {
    return this.dataSource.create(dto);
  }
  get(dto: GetEnrollmentDto): Promise<EnrollmentEntity[]> {
    return this.dataSource.get(dto);
  }
  update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
    return this.dataSource.update(dto);
  }
  delete(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity> {
    return this.dataSource.delete(dto);
  }
}
