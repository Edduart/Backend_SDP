import { instructorFichaDTO, InstructorRepository } from "../..";

export interface InstructorFichaUseCareInterface{
    execute(id: string): Promise<instructorFichaDTO>;
}

export class InstructorFichaUseCase implements InstructorFichaUseCareInterface {
    constructor(private readonly repository: InstructorRepository) {}
  
    async execute(id: string): Promise<instructorFichaDTO> {
      return this.repository.Ficha(id);
    }
}