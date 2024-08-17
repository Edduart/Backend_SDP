import { SeminarianDataSource, SeminarianRepository, CreateSeminarian, UpdateSeminarian, GetSeminarianDTO, SeminarianEntity, DocumenDTO, SeminarianFichaDTO } from "../../domain";

export class SeminarianRepositoryImpl implements SeminarianRepository{
    constructor (
        private readonly datasource: SeminarianDataSource,
    ){}
    Ficha(id: string): Promise<SeminarianFichaDTO> {
        return this.datasource.Ficha(id);
    }
    getByID(id: string): Promise<DocumenDTO> {
        return this.datasource.getByID(id);
    }
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