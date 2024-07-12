import { GetSubjectDTO, SubjectEntity, SubjectRepository } from "../..";


export interface GetSubjectUseCareInterface{
    execute(sper: GetSubjectDTO): Promise<SubjectEntity[]>;
}
export class GetSubjectUseCase implements GetSubjectUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(sper: GetSubjectDTO): Promise<SubjectEntity[]> {
      return this.repository.get(sper);
    }
}