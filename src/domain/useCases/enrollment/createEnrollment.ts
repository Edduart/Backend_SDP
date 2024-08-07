import { CreateEnrollmentDto } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface CreateEnrollmentUseCase {
  execute(dto: CreateEnrollmentDto): Promise<object>;
}

export class CreateEnrollment implements CreateEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: CreateEnrollmentDto): Promise<object> {
    return this.repository.create(dto);
  }
}
