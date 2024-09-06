import { EnrollmentRepository } from "../..";

interface ContarUse {
    execute(): Promise<number>;
}
  
export class ContarEnrollsUseCase implements ContarUse{
    constructor(private readonly repository: EnrollmentRepository) {}
  
    execute(): Promise<number> {
      return this.repository.ContarEnrolls();
    }
}