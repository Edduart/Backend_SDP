import { GetEnrollmentDto, EnrollmentGetInterface } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface GetEnrollmentUseCase {
  execute(dto: GetEnrollmentDto): Promise<EnrollmentGetInterface[]>;
}

export class GetEnrollment implements GetEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: GetEnrollmentDto): Promise<EnrollmentGetInterface[]> {
    return this.repository.get(dto);
  }
}
