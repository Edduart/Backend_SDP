import { AcademicTermDatasource, AcademicTermEntityt, AcademicTermRepository, CreateAcademicTerm, GetAcademicTerm, UpdateAcademicTerm } from "../../domain";

export class AcademicTermRepositoryImpl implements AcademicTermRepository {
    constructor(private readonly datasource: AcademicTermDatasource) {}
    Update(data: UpdateAcademicTerm): Promise<AcademicTermEntityt> {
        return this.datasource.Update(data);
    }
    Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]> {
        return this.datasource.Get(data);
    }
    create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
        return this.datasource.create(dto);
    }
}