import { AcademicTermEntityt, AcademicTermRepository } from "../..";

export interface PasscademicTerSemestermUse {
    execute(id: number): Promise<AcademicTermEntityt>;
}
  
  export class PassAcademicTermSemesterUseCase implements PasscademicTerSemestermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(id: number): Promise<AcademicTermEntityt> {
      return this.repository.PassSemester(id);
    }
}