import { Job_Psotion_Enum, WorkerEntity } from "../entities";
import { CreateWorker } from "../dtos";


export abstract class WorkerRepository{
    abstract create(data: CreateWorker): Promise<WorkerEntity>;
    abstract get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]>;
}
