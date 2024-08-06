import { UpdateSeminarian,CreateSeminarian, GetSeminarianDTO, DocumenDTO } from "../dtos";
import { SeminarianEntity } from "../entities";

export abstract class SeminarianRepository{
    abstract create(data: CreateSeminarian): Promise<string>;
    abstract get(data: GetSeminarianDTO): Promise<SeminarianEntity[]>;
    abstract getByID(id: string): Promise<DocumenDTO>;
    abstract Delete(id: string): Promise<string | null| undefined>;
    abstract Update(data: UpdateSeminarian): Promise<string>;
}