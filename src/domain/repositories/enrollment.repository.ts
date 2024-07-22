import { EnrollmentEntity } from "../entities";
import { CreateEnrollmentDto, UpdateEnrollmentDto } from "../dtos";

export abstract class EnrollmentRepository {
  abstract create(dto: CreateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract get(): Promise<EnrollmentEntity[]>;
  abstract update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract delete(id: number): Promise<EnrollmentEntity>;
}
