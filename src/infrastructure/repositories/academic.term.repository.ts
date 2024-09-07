import { AcademicTermDatasource, AcademicTermEntityt, AcademicTermRepository, CreateAcademicTerm, GetAcademicTerm, } from "../../domain";

export class AcademicTermRepositoryImpl implements AcademicTermRepository {
    constructor(private readonly datasource: AcademicTermDatasource) {}
    GetByID(data: GetAcademicTerm): Promise<AcademicTermEntityt> {
        return this.datasource.GetByID(data);
    }
    EndAcademicTerm(id: number): Promise<AcademicTermEntityt> {
        return this.datasource.EndAcademicTerm(id);
    }
    ActivateAcademicTerm(id: number): Promise<AcademicTermEntityt> {
        return this.datasource.ActivateAcademicTerm(id);
    }
    Update(id: number): Promise<AcademicTermEntityt> {
        return this.datasource.Update(id);
    }
    Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]> {
        return this.datasource.Get(data);
    }
    create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
        return this.datasource.create(dto);
    }
}