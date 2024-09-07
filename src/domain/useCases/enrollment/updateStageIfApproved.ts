import { EnrollmentRepository } from "../../repositories";

interface UpdateStageIfApprovedUseCase {
  execute(): Promise<object>;
}

export class UpdateStageIfApproved implements UpdateStageIfApprovedUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(): Promise<object> {
    return this.repository.updateStageIfApproved();
  }
}
