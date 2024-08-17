import { DeleteEnrollmentDto } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface DeleteEnrollmentUseCase {
  execute(id: number): Promise<EnrollmentEntity>;
}

export class DeleteEnrollment implements DeleteEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(id: number): Promise<EnrollmentEntity> {
    return this.repository.delete(id);
  }
}
