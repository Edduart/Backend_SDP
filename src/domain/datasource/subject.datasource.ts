import { CreateSubjectDTO, GetSubjectDTO, SubjectEntity, UpdateSubjectDTO } from "..";

export abstract class SubjectDataSource{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    abstract get(data: GetSubjectDTO): Promise<SubjectEntity[]>;
    //abstract Delete(id: string): Promise<SubjectEntity>;
    abstract Update(data: UpdateSubjectDTO): Promise<SubjectEntity>;
}