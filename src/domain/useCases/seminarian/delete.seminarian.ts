import { SeminarianRepository } from "../..";

export interface DeleteSeminarianUseCareInterface{
    execute(sper: string): Promise<string| null | undefined>;
}

export class DeleteSeminarianUseCase implements DeleteSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(sper: string): Promise<string| null | undefined> {
      return this.repository.Delete(sper);
    }
  }