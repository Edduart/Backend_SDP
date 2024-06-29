

import { CreateSeminarian } from "../dtos/seminarian/create.seminarian";

export abstract class SeminarianRepository{
    abstract create(data: CreateSeminarian): Promise<null>;
    //abstract get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]>;
    //abstract Delete(id: string): Promise<string>;
    //abstract Update(data: CreateWorker): Promise<WorkerEntity>;
    //abstract GetSocial(): Promise<SocialMediaCategoryEntity[]>;
}