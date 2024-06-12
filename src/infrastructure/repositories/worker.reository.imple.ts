import { CreateWorker, Job_Psotion_Enum, WorkerDataSource, WorkerEntity, WorkerRepository } from "../../domain";


export class WorkerRepositoryImpl implements WorkerRepository{
    constructor (
        private readonly datasource: WorkerDataSource,
    ){}
    Delete(id: string): Promise<string> {
        return this.datasource.Delete(id);
    }
    create(data: CreateWorker): Promise<WorkerEntity> {
        return this.datasource.create(data);
    }
    get(id_re: string | undefined, puesto: Job_Psotion_Enum | undefined): Promise<WorkerEntity[]> {
        return this.datasource.get(id_re,puesto);
    }
}