import { CreateSubjectDTO, GetSubjectDTO, SubjectDataSource, SubjectEntity, SubjectRepository } from "../../domain";

export class SubjectRepositoryImpl implements SubjectRepository{
    constructor (
        private readonly datasource: SubjectDataSource,
    ){}
    get(data: GetSubjectDTO): Promise<SubjectEntity[]> {
        return this.datasource.get(data);
    }

    create(data: CreateSubjectDTO): Promise<SubjectEntity> {
        return this.datasource.create(data);
    }
    
}