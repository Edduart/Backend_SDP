import { AcademicTermEntityt, CreateAcademicTerm } from "..";

export abstract class AcademicTermDatasource {
    abstract create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
}