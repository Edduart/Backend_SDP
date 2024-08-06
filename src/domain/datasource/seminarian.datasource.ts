import { SeminarianEntity } from "..";
import { UpdateSeminarian,CreateSeminarian, GetSeminarianDTO, DocumenDTO } from "../dtos";

export abstract class SeminarianDataSource{
    abstract create(data: CreateSeminarian): Promise<string>;
    abstract get(data: GetSeminarianDTO): Promise<SeminarianEntity[]>;
    abstract getByID(id: string): Promise<DocumenDTO>;
    abstract Delete(id: string): Promise<string| null| undefined>;
    abstract Update(data: UpdateSeminarian): Promise<string>;
}