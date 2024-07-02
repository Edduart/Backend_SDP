import { UpdateSeminarian,CreateSeminarian } from "../dtos";

export abstract class SeminarianDataSource{
    abstract create(data: CreateSeminarian): Promise<string>;
    //abstract get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]>;
    //abstract Delete(id: string): Promise<string>;
    abstract Update(data: UpdateSeminarian): Promise<string>;
    //abstract GetSocial(): Promise<SocialMediaCategoryEntity[]>;
}