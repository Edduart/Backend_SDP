import { GetSubjectDTO, SubjectDeliver, SubjectRepository } from "../..";

export interface GetSubjecInsttUseCareInterface{
    execute(sper: GetSubjectDTO): Promise<SubjectDeliver[]>;
}
export class GetSubjecInsttUseCase implements GetSubjecInsttUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(sper: GetSubjectDTO): Promise<SubjectDeliver[]> {
      return this.repository.get_instruction(sper);
    }
}