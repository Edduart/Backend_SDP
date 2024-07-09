import { CreateSubjectDTO, SubjectEntity } from "..";

export abstract class SeminarianDataSource{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    //abstract get(data: GetSeminarianDTO): Promise<SeminarianEntity[]>;
    //abstract Delete(id: string): Promise<string| null| undefined>;
    //abstract Update(data: UpdateSeminarian): Promise<string>;
}