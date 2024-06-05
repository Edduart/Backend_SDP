import { prisma } from "../../data/postgres";
import {
  CreateStageDto,
  StageDataSource,
  StageEntity,
  UpdateStageDto,
} from "../../domain";

export class StageDataSourceImple implements StageDataSource {

  async create(dto: CreateStageDto): Promise<StageEntity> {
    const createStage = await prisma.stage.create({
      data: dto!,
    });
    return StageEntity.fromObject(createStage);
  }

  async updateById(dto: UpdateStageDto): Promise<StageEntity> {
    const updatestage = await prisma.stage.update({
        where: {
            id: dto.id
        },
            data: dto!.values
    });
    return StageEntity.fromObject(updatestage);
  }
  
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

  async deleteById(id: number): Promise<StageEntity> {
    const deleteStageById = await prisma.stage.delete({
      where: {id: id}
    })
    return StageEntity.fromObject(deleteStageById);
  }
}
