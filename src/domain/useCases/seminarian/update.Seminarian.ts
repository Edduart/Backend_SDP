import { SeminarianRepository } from "../..";
import { UpdateSeminarian } from "../../dtos";

export interface UpdateSeminarianUseCareInterface{
    execute(sper: UpdateSeminarian): Promise<string>;
}

export class UpdateSeminarianUseCase implements UpdateSeminarianUseCareInterface {
    constructor(private readonly repository: SeminarianRepository) {}
  
    async execute(sper: UpdateSeminarian): Promise<string> {
      return this.repository.Update(sper);
    }
  }