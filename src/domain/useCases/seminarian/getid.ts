import { DocumenDTO, SeminarianRepository } from "../..";

export interface GetByIDSeminarianUseCareInterface{
    execute(id: string): Promise<DocumenDTO>;
}

export class GetByIDSeminarianUseCase implements GetByIDSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(id: string): Promise<DocumenDTO> {
      return this.repository.getByID(id);
    }
  }