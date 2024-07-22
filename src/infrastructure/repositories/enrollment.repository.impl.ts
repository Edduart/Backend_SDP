import {
  CreateEnrollmentDto,
  EnrollmentDataSource,
  EnrollmentEntity,
  EnrollmentRepository,
  UpdateEnrollmentDto,
} from "../../domain";

export class EnrollmentRepositoryImpl implements EnrollmentRepository {
  constructor(private readonly dataSource: EnrollmentDataSource) {}
    create(dto: CreateEnrollmentDto): Promise<EnrollmentEntity> {
        return this.dataSource.create(dto);
    }
    get(): Promise<EnrollmentEntity[]> {
        return this.dataSource.get();
    }
    update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
        return this.dataSource.update(dto);
    }
    delete(id: number): Promise<EnrollmentEntity> {
        return this.dataSource.delete(id);
    }

}
