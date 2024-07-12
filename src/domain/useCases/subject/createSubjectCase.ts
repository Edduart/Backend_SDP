import { CreateSeminarian, CreateSubjectDTO, SubjectEntity, SubjectRepository } from "../..";

export interface CreateSubjectUseCareInterface{
    execute(sper: CreateSubjectDTO): Promise<SubjectEntity>;
}
export class CreateSubjectUseCase implements CreateSubjectUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(sper: CreateSubjectDTO): Promise<SubjectEntity> {
      return this.repository.create(sper);
    }
}