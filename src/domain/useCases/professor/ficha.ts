import { ProfesorFichaDTO, ProfessorRepository } from "../..";

export interface FichaProfessorUSeCaseInterface {
    execute(id: string): Promise<ProfesorFichaDTO>;
  }
  
  export class FichaUsePRofe implements FichaProfessorUSeCaseInterface {
    constructor(private readonly repository: ProfessorRepository) {}
  
    execute(id: string): Promise<ProfesorFichaDTO> {
      return this.repository.Ficha(id);
    }
  }