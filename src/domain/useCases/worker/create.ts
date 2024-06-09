import { CreateWorker } from "../../dtos";
import { WorkerEntity } from "../../entities";
import { WorkerRepository } from "../../repositories";




export interface CreateWorkerUseCare{
    execute(sper: CreateWorker): Promise<WorkerEntity>;
}

export class CreateRole implements CreateWorkerUseCare {
    constructor(private readonly repository: WorkerRepository) {}
  
    execute(sper: CreateWorker): Promise<WorkerEntity> {
      return this.repository.create(sper);
    }
  }