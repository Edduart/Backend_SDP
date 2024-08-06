import { AcademicTermEntityt, AcademicTermRepository } from "../..";

export interface UpdateAcademicTermUse {
    execute(id: number): Promise<AcademicTermEntityt>;
  }
  
  export class updateAcademicTermUseCase implements UpdateAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(id: number): Promise<AcademicTermEntityt> {
      return this.repository.Update(id);
    }
  }