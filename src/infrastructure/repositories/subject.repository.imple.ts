import { CreateSubjectDTO, SubjectDataSource, SubjectEntity, SubjectRepository } from "../../domain";

export class SubjectRepositoryImpl implements SubjectRepository{
    constructor (
        private readonly datasource: SubjectDataSource,
    ){}
    get(): Promise<SubjectEntity[]> {
        return this.datasource.get();
    }

    create(data: CreateSubjectDTO): Promise<SubjectEntity> {
        return this.datasource.create(data);
    }
    
}