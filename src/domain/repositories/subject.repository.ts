import { academicFieldEntity, CreateSubjectDTO, GetSubjectDTO, SubjectDeliver, SubjectEntity, UpdateSubjectDTO } from "..";

export abstract class SubjectRepository{
    abstract create(data: CreateSubjectDTO): Promise<SubjectEntity>;
    abstract get(data: GetSubjectDTO): Promise<SubjectEntity[]>;
    abstract Delete(id: number): Promise<SubjectEntity>;
    abstract Update(data: UpdateSubjectDTO): Promise<SubjectEntity>;
    abstract get_instruction(data: GetSubjectDTO): Promise<SubjectDeliver[]>;
    abstract Get_fields(): Promise<academicFieldEntity[]>;
}