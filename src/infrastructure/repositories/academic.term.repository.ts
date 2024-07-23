import { AcademicTermDatasource, AcademicTermEntityt, AcademicTermRepository, CreateAcademicTerm, GetAcademicTerm, UpdateAcademicTerm } from "../../domain";

export class AcademicTermRepositoryImpl implements AcademicTermRepository {
    constructor(private readonly datasource: AcademicTermDatasource) {}
    PassSemester(id: number): Promise<AcademicTermEntityt> {
        return this.datasource.PassSemester(id);
    }
    EndAcademicTerm(id: number): Promise<AcademicTermEntityt> {
        return this.datasource.EndAcademicTerm(id);
    }
    ActivateAcademicTerm(id: number): Promise<AcademicTermEntityt> {
        return this.datasource.ActivateAcademicTerm(id);
    }
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