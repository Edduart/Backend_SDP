import { SeminarianDataSource, SeminarianRepository, CreateSeminarian, UpdateSeminarian } from "../../domain";

export class SeminarianRepositoryImpl implements SeminarianRepository{
    constructor (
        private readonly datasource: SeminarianDataSource,
    ){}

    create(data: CreateSeminarian): Promise<string> {
        return this.datasource.create(data);
    }
    /*
    GetSocial(): Promise<SocialMediaCategoryEntity[]> {
        return this.datasource.GetSocial();
    }*/
    Update(data: UpdateSeminarian): Promise<string> {
        return this.datasource.Update(data);
    }
    /*
    Delete(id: string): Promise<string> {
        return this.datasource.Delete(id);
    }
    get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]> {
        return this.datasource.get(id_re,puesto);
    }*/
}