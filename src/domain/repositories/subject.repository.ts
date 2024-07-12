import { CreateSubjectDTO, SubjectEntity } from "..";

export abstract class SubjectRepository{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    abstract get(): Promise<SubjectEntity[]>;
    //abstract Delete(id: string): Promise<string| null| undefined>;
    //abstract Update(data: UpdateSeminarian): Promise<string>;
}