import { AcademicTermEntityt, AcademicTermRepository } from "../..";

export interface EndAcademicTermUse {
    execute(id: number): Promise<AcademicTermEntityt>;
}
  
  export class EndAcademicTermUseCase implements EndAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(id: number): Promise<AcademicTermEntityt> {
      return this.repository.EndAcademicTerm(id);
    }
}