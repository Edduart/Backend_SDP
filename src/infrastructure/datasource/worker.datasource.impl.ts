import { prisma } from "../../data/postgres";
import { CreateWorker, WorkerDataSource, WorkerEntity } from "../../domain";

export class WorkerDataSourceImpl implements WorkerDataSource{
    create(spers: CreateWorker): Promise<WorkerEntity> {
        
        prisma.$transaction(async (tx) => {
            
        })

        throw new Error("Method not implemented.");
    }


}