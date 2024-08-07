import { SeminarianDataSource, SeminarianRepository, CreateSeminarian, UpdateSeminarian, GetSeminarianDTO, SeminarianEntity } from "../../domain";

export class SeminarianRepositoryImpl implements SeminarianRepository{
    constructor (
        private readonly datasource: SeminarianDataSource,
    ){}
    get(data: GetSeminarianDTO): Promise<SeminarianEntity[]> {
        return this.datasource.get(data);
    }

    create(data: CreateSeminarian): Promise<string> {
        return this.datasource.create(data);
    }
    Update(data: UpdateSeminarian): Promise<string> {
        return this.datasource.Update(data);
    }
    Delete(id: string): Promise<string| null| undefined> {
        return this.datasource.Delete(id);
    }
    
}