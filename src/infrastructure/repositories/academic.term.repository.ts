import { AcademicTermDatasource, AcademicTermEntityt, AcademicTermRepository, CreateAcademicTerm } from "../../domain";

export class AcademicTermRepositoryImpl implements AcademicTermRepository {
    constructor(private readonly datasource: AcademicTermDatasource) {}
    create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
        return this.datasource.create(dto);
    }
}