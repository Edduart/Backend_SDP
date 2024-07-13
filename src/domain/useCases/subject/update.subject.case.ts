import { SubjectEntity, SubjectRepository, UpdateSubjectDTO } from "../..";

export interface updateSubjectUseCareInterface{
    execute(sper: UpdateSubjectDTO): Promise<SubjectEntity>;
}
export class UpdateSubjectUseCase implements updateSubjectUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(sper: UpdateSubjectDTO): Promise<SubjectEntity> {
      return this.repository.Update(sper);
    }
}