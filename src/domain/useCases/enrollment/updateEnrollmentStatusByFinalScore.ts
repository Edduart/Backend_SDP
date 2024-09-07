import { EnrollmentRepository } from "../../repositories";

interface UpdateEnrollmentStatusByFinalScoreUseCase {
  execute(): Promise<object>;
}

export class UpdateEnrollmentStatusByFinalScore
  implements UpdateEnrollmentStatusByFinalScoreUseCase
{
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(): Promise<object> {
    return this.repository.updateStatusByFinalSubjectScore();
  }
}
