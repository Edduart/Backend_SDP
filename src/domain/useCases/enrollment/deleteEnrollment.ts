import { DeleteEnrollmentDto } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface DeleteEnrollmentUseCase {
  execute(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity>;
}

export class DeleteEnrollment implements DeleteEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: DeleteEnrollmentDto): Promise<EnrollmentEntity> {
    return this.repository.delete(dto);
  }
}
