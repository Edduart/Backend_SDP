import { AcademicTermEntityt, AcademicTermRepository, UpdateAcademicTerm } from "../..";

export interface UpdateAcademicTermUse {
    execute(data: UpdateAcademicTerm): Promise<AcademicTermEntityt>;
  }
  
  export class updateAcademicTermUseCase implements UpdateAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(data: UpdateAcademicTerm): Promise<AcademicTermEntityt> {
      return this.repository.Update(data);
    }
  }