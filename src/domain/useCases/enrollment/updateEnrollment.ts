import { UpdateEnrollmentDto } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface UpdateEnrollmentUseCase {
  execute(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity>;
}

export class UpdateEnrollment implements UpdateEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: UpdateEnrollmentDto): Promise<EnrollmentEntity> {
    return this.repository.update(dto);
  }
}
