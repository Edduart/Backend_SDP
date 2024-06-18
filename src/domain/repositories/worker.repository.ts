import { Job_Psotion_Enum, SocialMediaCategoryEntity, WorkerEntity } from "../entities";
import { CreateWorker } from "../dtos";


export abstract class WorkerRepository{
    abstract create(data: CreateWorker): Promise<WorkerEntity>;
    abstract get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]>;
    abstract Delete(id: string): Promise<string>;
    abstract Update(data: CreateWorker): Promise<WorkerEntity>;
    abstract GetSocial(): Promise<SocialMediaCategoryEntity[]>;
}
