import { DocumenDTO, SeminarianRepository } from "../..";

export interface GetByIDCulminadoSeminarianUseCareInterface{
    execute(id: string): Promise<DocumenDTO>;
}

export class GetByIDCulminadoSeminarianUseCase implements GetByIDCulminadoSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(id: string): Promise<DocumenDTO> {
      return this.repository.getByIDCulminado(id);
    }
}