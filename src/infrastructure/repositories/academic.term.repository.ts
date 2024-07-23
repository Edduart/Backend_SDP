import { AcademicTermDatasource, AcademicTermEntityt, AcademicTermRepository, CreateAcademicTerm, GetAcademicTerm } from "../../domain";

export class AcademicTermRepositoryImpl implements AcademicTermRepository {
    constructor(private readonly datasource: AcademicTermDatasource) {}
    Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]> {
        return this.datasource.Get(data);
    }
    create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
        return this.datasource.create(dto);
    }
}