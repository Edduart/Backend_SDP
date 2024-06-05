import { prisma } from "../../data/postgres";
import {
  StageDataSource,
  StageEntity,
} from "../../domain";

export class StageDataSourceImple implements StageDataSource {
  
  async getAll(): Promise<StageEntity[]> {
    const getStages = await prisma.stage.findMany();
    return getStages.map((stages) => StageEntity.fromObject(stages));
  }

  async findById(id: number): Promise<StageEntity> {
    const getStageById = await prisma.stage.findUnique({
        where: { id: id }
    })
    if (!getStageById) throw "Stage with ID: ${id} no found";
    return StageEntity.fromObject(getStageById);
  }
}
