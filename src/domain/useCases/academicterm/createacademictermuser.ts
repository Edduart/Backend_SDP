import { AcademicTermEntityt, AcademicTermRepository, CreateAcademicTerm } from "../..";

export interface CreateAcademicTermUse {
    execute(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
  }
  
  export class CreateAcademicTermUseCase implements CreateAcademicTermUse {
    constructor(private readonly repository: AcademicTermRepository) {}
  
    execute(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
      return this.repository.create(dto);
    }
  }
  