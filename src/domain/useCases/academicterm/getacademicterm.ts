import { AcademicTermEntityt, AcademicTermRepository, GetAcademicTerm } from "../..";

export interface GetAcademicTermUse {
    execute(data: GetAcademicTerm): Promise<AcademicTermEntityt[]>;
}

export class GetAcademicTermUseCase implements GetAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(data: GetAcademicTerm): Promise<AcademicTermEntityt[]> {
      return this.repository.Get(data);
    }
}