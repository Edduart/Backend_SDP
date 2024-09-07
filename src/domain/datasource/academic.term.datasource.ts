import { AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm } from "..";

export abstract class AcademicTermDatasource {
    abstract create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
    abstract Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]>;
    abstract GetByID(data: GetAcademicTerm): Promise<AcademicTermEntityt>;
    abstract Update(id: number): Promise<AcademicTermEntityt>;
    abstract EndAcademicTerm(id: number): Promise<AcademicTermEntityt>;
    abstract ActivateAcademicTerm(id: number): Promise<AcademicTermEntityt>;
}