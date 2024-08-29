import { EnrollmentRepository } from "../../repositories";

interface UpdateEnrollmentStatusByFinalScoreUseCase {
  execute(): void;
}

export class UpdateEnrollmentStatusByFinalScore
  implements UpdateEnrollmentStatusByFinalScoreUseCase
{
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(): void {
    return this.repository.updateStatusByFinalSubjectScore();
  }
}
