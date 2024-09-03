import { SubjectAllowToEnrollEquivalencyDto, SubjectAllowToEnrollEquivalency } from "../../dtos";
import { EnrollmentRepository } from "../../repositories";

interface GetSubjectAllowToEnrollEquivalencyUseCase {
  execute(
    dto: SubjectAllowToEnrollEquivalencyDto
  ): Promise<SubjectAllowToEnrollEquivalency>;
}

export class GetSubjectAllowToEnrollEquivalency
  implements GetSubjectAllowToEnrollEquivalencyUseCase
{
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(
    dto: SubjectAllowToEnrollEquivalencyDto
  ): Promise<SubjectAllowToEnrollEquivalency> {
    return this.repository.getSubjectsToEnroll(dto);
  }
}
