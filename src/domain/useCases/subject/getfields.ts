import { academicFieldEntity, SubjectRepository } from "../..";

export interface GetFieldsUseCareInterface{
    execute(): Promise<academicFieldEntity[]>;
}
export class GetFieldstUseCase implements GetFieldsUseCareInterface {
    constructor(private readonly repository: SubjectRepository) {}
  
    async execute(): Promise<academicFieldEntity[]> {
      return this.repository.Get_fields();
    }
}