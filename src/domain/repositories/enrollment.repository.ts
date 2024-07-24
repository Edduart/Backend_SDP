import { EnrollmentEntity } from "../entities";
import {
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
  GetEnrollmentDto,
  DeleteEnrollmentDto,
} from "../dtos";

export abstract class EnrollmentRepository {
  abstract create(dto: CreateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract get(dto: GetEnrollmentDto): Promise<EnrollmentEntity[]>;
  abstract update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract delete(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity>;
}
