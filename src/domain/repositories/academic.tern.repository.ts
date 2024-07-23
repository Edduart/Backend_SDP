import { AcademicTermEntityt, CreateAcademicTerm } from "..";

export abstract class AcademicTermRepository {
    abstract create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
}