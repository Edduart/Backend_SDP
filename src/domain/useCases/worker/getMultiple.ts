import { Job_Psotion_Enum, WorkerEntity, WorkerRepository } from "../..";


export interface GetWorkerUseCase{
    execute(id: string|undefined, puesto: Job_Psotion_Enum|undefined): Promise<WorkerEntity[]>;
}

export class GetWorker implements GetWorkerUseCase {
    constructor(private readonly repository: WorkerRepository) {}
  
    execute(id: string|undefined, puesto: Job_Psotion_Enum|undefined): Promise<WorkerEntity[]> {
      return this.repository.get(id, puesto);
    }
  }