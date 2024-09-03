import { GetAcademicStatusDto } from "../../dtos";
import { EnrollmentEntity } from "../../entities";
import { EnrollmentRepository } from "../../repositories";

interface GetAcademicStatusUseCase {
  execute(dto: GetAcademicStatusDto): Promise<object>;
}

export class GetAcademicStatus implements GetAcademicStatusUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: GetAcademicStatusDto): Promise<object> {
    return this.repository.getAcademicStatus(dto);
  }
}
