import { CreateSubjectDTO, GetSubjectDTO, SubjectEntity } from "..";

export abstract class SubjectRepository{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    abstract get(data: GetSubjectDTO): Promise<SubjectEntity[]>;
    //abstract Delete(id: string): Promise<string| null| undefined>;
    //abstract Update(data: UpdateSeminarian): Promise<string>;
}