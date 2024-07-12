import { CreateSubjectDTO, GetSubjectDTO, SubjectEntity } from "..";

export abstract class SubjectDataSource{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    abstract get(data: GetSubjectDTO): Promise<SubjectEntity[]>;
    //abstract getMenus(): Promise<object>;
    //abstract Delete(id: string): Promise<string| null| undefined>;
    //abstract Update(data: UpdateSeminarian): Promise<string>;
}