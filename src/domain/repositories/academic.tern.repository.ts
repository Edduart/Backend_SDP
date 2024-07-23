import { AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm } from "..";

export abstract class AcademicTermRepository {
    abstract create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
    abstract Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]>;
}