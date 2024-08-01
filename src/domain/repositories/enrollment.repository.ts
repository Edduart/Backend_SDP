import { EnrollmentEntity } from "../entities";
import {
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
  GetEnrollmentDto,
  DeleteEnrollmentDto,
  GetAcademicStatusDto,
  EnrollmentGetInterface,
} from "../dtos";

export abstract class EnrollmentRepository {
  abstract create(dto: CreateEnrollmentDto): Promise<object>;
  abstract get(dto: GetEnrollmentDto): Promise<EnrollmentGetInterface[]>;
  abstract getAcademicStatus(dto: GetAcademicStatusDto): Promise<object>;
  abstract update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract delete(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity>;
}
