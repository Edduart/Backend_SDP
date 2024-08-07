import { CreateSeminarian, SeminarianRepository } from "../..";

export interface CreateSeminarianUseCareInterface{
    execute(sper: CreateSeminarian): Promise<string>;
}

export class CreateSeminarianUseCase implements CreateSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(sper: CreateSeminarian): Promise<string> {
      return this.repository.create(sper);
    }
  }