import { EnrollmentEntity } from "../entities";
import {
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
  GetEnrollmentDto,
  DeleteEnrollmentDto,
  GetAcademicStatusDto,
} from "../dtos";

export abstract class EnrollmentDataSource {
  abstract create(dto: CreateEnrollmentDto): Promise<object>;
  abstract get(dto: GetEnrollmentDto): Promise<EnrollmentEntity[]>;
  abstract getAcademicStatus(dto: GetAcademicStatusDto): Promise<object>;
  abstract update(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity>;
  abstract delete(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity>;
}
