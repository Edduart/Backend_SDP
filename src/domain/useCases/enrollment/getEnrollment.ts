import { GetEnrollmentDto} from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface GetEnrollmentUseCase {
  execute(dto: GetEnrollmentDto): Promise<EnrollmentEntity[]>;
}

export class GetEnrollment implements GetEnrollmentUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: GetEnrollmentDto): Promise<EnrollmentEntity[]> {
    return this.repository.get(dto);
  }
}
