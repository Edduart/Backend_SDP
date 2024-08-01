import { AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm, UpdateAcademicTerm } from "..";

export abstract class AcademicTermDatasource {
    abstract create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
    abstract Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]>;
    abstract Update(data: UpdateAcademicTerm): Promise<AcademicTermEntityt>;
    abstract PassSemester(id: number): Promise<AcademicTermEntityt>;
    abstract EndAcademicTerm(id: number): Promise<AcademicTermEntityt>;
    abstract ActivateAcademicTerm(id: number): Promise<AcademicTermEntityt>;
}