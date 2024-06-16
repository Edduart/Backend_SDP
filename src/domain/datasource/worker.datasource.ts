import { CreateWorker } from "../dtos";
import { Job_Psotion_Enum, PersonEntity, SocialMediaCategoryEntity } from "../entities";
import { WorkerEntity } from "../entities";


export abstract class WorkerDataSource{
    abstract create(data: CreateWorker): Promise<WorkerEntity>;
    abstract get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]>;
    abstract Delete(id: string): Promise<string>;
    abstract Update(data: CreateWorker): Promise<WorkerEntity>;
    abstract GetSocial(): Promise<SocialMediaCategoryEntity[]>;
}