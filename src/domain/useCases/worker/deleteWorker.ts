import { WorkerRepository } from "../..";

export interface DeleteWorkerUseCare{
    execute(id: string): Promise<string>;
}

export class DeleteWorker implements DeleteWorkerUseCare {
    constructor(private readonly repository: WorkerRepository) {}
  
    execute(id: string): Promise<string> {
      return this.repository.Delete(id);
    }
  }