import { AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm, UpdateAcademicTerm } from "..";

export abstract class AcademicTermRepository {
    abstract create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt>;
    abstract Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]>;
    abstract Update(data: UpdateAcademicTerm): Promise<AcademicTermEntityt>;
}