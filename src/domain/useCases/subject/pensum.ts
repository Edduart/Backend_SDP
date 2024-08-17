import { Stage_PensumDTO, SubjectRepository } from "../..";

export interface PensumSubjectUseCareInterface{
    execute(): Promise<Stage_PensumDTO[]>;
}
export class PensumSubjectUseCase implements PensumSubjectUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(): Promise<Stage_PensumDTO[]> {
      return this.repository.Pensum();
    }
}