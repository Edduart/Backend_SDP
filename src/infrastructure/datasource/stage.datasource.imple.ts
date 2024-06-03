import { prisma } from "../../data/postgres";
import { CreateStageDto, StageDataSource, StageEntity, UpdateDioceseDto } from "../../domain";

export class StageDataSourceImple implements StageDataSource {
    create(dto: CreateStageDto): Promise<StageEntity> {
        throw new Error("Method not implemented.");
    }
    Update(dto: UpdateDioceseDto): Promise<StageEntity> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<StageEntity[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<StageEntity> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }

}