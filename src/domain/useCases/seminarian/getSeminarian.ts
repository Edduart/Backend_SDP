import { GetSeminarianDTO, SeminarianEntity, SeminarianRepository } from "../..";

export interface GetSeminarianUseCareInterface{
    execute(sper: GetSeminarianDTO): Promise<SeminarianEntity[]>;
}

export class GetSeminarianUseCase implements GetSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(sper: GetSeminarianDTO): Promise<SeminarianEntity[]> {
      return this.repository.get(sper);
    }
  }