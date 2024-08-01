import { AcademicTermEntityt, AcademicTermRepository } from "../..";

export interface ActivateAcademicTermUse {
    execute(id: number): Promise<AcademicTermEntityt>;
}
  
  export class ActivateAcademicTermUseCase implements ActivateAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(id: number): Promise<AcademicTermEntityt> {
      return this.repository.ActivateAcademicTerm(id);
    }
}