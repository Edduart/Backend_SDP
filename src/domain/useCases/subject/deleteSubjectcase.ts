import { SubjectEntity, SubjectRepository } from "../..";

export interface DeleteSubjectUseCareInterface{
    execute(sper: number): Promise<SubjectEntity>;
}
export class DeleteSubjectUseCase implements DeleteSubjectUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(sper: number): Promise<SubjectEntity> {
      return this.repository.Delete(sper);
    }
}