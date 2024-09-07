import { SeminarianFichaDTO, SeminarianRepository } from "../..";

export interface SeminarianFichaUseCareInterface{
    execute(id: string): Promise<SeminarianFichaDTO>;
}

export class SeminarianFichaUseCase implements SeminarianFichaUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(id: string): Promise<SeminarianFichaDTO> {
      return this.repository.Ficha(id);
    }
}