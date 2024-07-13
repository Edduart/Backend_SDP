import { CreateSubjectDTO, GetSubjectDTO, SubjectDataSource, SubjectEntity, SubjectRepository, UpdateSubjectDTO } from "../../domain";

export class SubjectRepositoryImpl implements SubjectRepository{
    constructor (
        private readonly datasource: SubjectDataSource,
    ){}
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