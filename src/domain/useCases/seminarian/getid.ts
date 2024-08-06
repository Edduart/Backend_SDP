import { SeminarianEntity, SeminarianRepository } from "../..";

export interface GetByIDSeminarianUseCareInterface{
    execute(id: string): Promise<SeminarianEntity>;
}

export class GetByIDSeminarianUseCase implements GetByIDSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(id: string): Promise<SeminarianEntity> {
      return this.repository.getByID(id);
    }
  }