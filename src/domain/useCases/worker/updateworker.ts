import { CreateWorker } from "../../dtos";
import { WorkerEntity } from "../../entities";
import { WorkerRepository } from "../../repositories";

export interface UpdateWorkerUseCare{
    execute(data: CreateWorker): Promise<WorkerEntity>;
}

export class UpdateWorkerUseCase implements UpdateWorkerUseCare {
    constructor(private readonly repository: WorkerRepository) {}
  
    async execute(data: CreateWorker): Promise<WorkerEntity> {
      return this.repository.Update(data);
    }
  }