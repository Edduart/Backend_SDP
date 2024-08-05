import { AcademicTermEntityt, AcademicTermRepository, GetAcademicTerm } from "../..";

export interface GetbyidAcademicTermUse {
    execute(data: GetAcademicTerm): Promise<AcademicTermEntityt>;
}

export class GetbyidAcademicTermUseCase implements GetbyidAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(data: GetAcademicTerm): Promise<AcademicTermEntityt> {
      return this.repository.GetByID(data);
    }
}