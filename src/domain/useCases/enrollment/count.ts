import { EnrollmentRepository } from "../..";

interface ContarUse {
    execute(): Promise<object>;
}
  
export class ContarEnrollsUseCase implements ContarUse{
    constructor(private readonly repository: EnrollmentRepository) {}
  
    execute(): Promise<object> {
      return this.repository.ContarEnrolls();
    }
}