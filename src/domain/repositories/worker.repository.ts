import { WorkerEntity } from "../entities";
import { CreateWorker } from "../dtos";


export abstract class WorkerRepository{
    abstract create(data: CreateWorker): Promise<WorkerEntity>;
}