import { CreateWorker } from "../dtos";
import { PersonEntity } from "../entities";
import { WorkerEntity } from "../entities";


export abstract class WorkerDataSource{
    abstract create(data: CreateWorker): Promise<WorkerEntity>;
    abstract get(id: number): Promise<WorkerEntity[]>;
    
}