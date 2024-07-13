import { CreateSubjectDTO, GetSubjectDTO, SubjectEntity, UpdateSubjectDTO } from "..";

export abstract class SubjectRepository{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    abstract get(data: GetSubjectDTO): Promise<SubjectEntity[]>;
    //abstract Delete(id: string): Promise<string| null| undefined>;
    abstract Update(data: UpdateSubjectDTO): Promise<SubjectEntity>;
}