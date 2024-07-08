import { UpdateSeminarian,CreateSeminarian, GetSeminarianDTO } from "../dtos";
import { SeminarianEntity } from "../entities";

export abstract class SeminarianRepository{
    abstract create(data: CreateSeminarian): Promise<string>;
    abstract get(data: GetSeminarianDTO): Promise<SeminarianEntity[]>;
    abstract Delete(id: string): Promise<string | null| undefined>;
    abstract Update(data: UpdateSeminarian): Promise<string>;
}