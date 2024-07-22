//import { } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface GetEnrollmentUseCase {
  execute(): Promise<EnrollmentEntity[]>;
}

export class GetEnrollment implements GetEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(): Promise<EnrollmentEntity[]> {
    return this.repository.get();
  }
}
