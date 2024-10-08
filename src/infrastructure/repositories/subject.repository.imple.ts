import { academicFieldEntity, CreateSubjectDTO, GetSubjectDTO, Stage_PensumDTO, SubjectDataSource, SubjectDeliver, SubjectEntity, SubjectRepository, UpdateSubjectDTO } from "../../domain";

export class SubjectRepositoryImpl implements SubjectRepository{
    constructor (
        private readonly datasource: SubjectDataSource,
    ){}
    Pensum(): Promise<Stage_PensumDTO[]> {
        return this.datasource.Pensum();
    }
    Get_fields(): Promise<academicFieldEntity[]> {
        return this.datasource.Get_fields();
    }
    get_instruction(data: GetSubjectDTO): Promise<SubjectDeliver[]> {
        return this.datasource.get_instruction(data);
    }
    Delete(id: number): Promise<SubjectEntity> {
        return this.datasource.Delete(id);
    }
    Update(data: UpdateSubjectDTO): Promise<SubjectEntity> {
        return this.datasource.Update(data);
    }
    get(data: GetSubjectDTO): Promise<SubjectEntity[]> {
        return this.datasource.get(data);
    }

    create(data: CreateSubjectDTO): Promise<SubjectEntity> {
        return this.datasource.create(data);
    }
    
}