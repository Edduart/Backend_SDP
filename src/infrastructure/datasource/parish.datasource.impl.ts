//This is the controller 
import { prisma } from "../../data/postgres";
import {
  UpdateParishDto,
  ParishEntity,
  ParishDataSource,
  CreateParishDto,
  DeleteParish,
  DioceseEntity
} from "../../domain";



export class ParishDatasourceimpl implements ParishDataSource {


  async getAll(): Promise<ParishEntity[]> {
    const parishes = await prisma.parish.findMany();
    return parishes.map((parishes) => ParishEntity.fromObject(parishes));
  }

  async findById(id: number): Promise<ParishEntity> {
    const parish = await prisma.parish.findUnique({
      where: {
        id: id,
      },
    });
    if (!parish) throw `Parish with id ${id} not found`;
    return ParishEntity.fromObject(parish);
  }

    async updateById(updateParishDto: UpdateParishDto): Promise<ParishEntity> {
    await this.findById(updateParishDto.id);
    const updateParish = await prisma.parish.update({
      where: { id: updateParishDto.id },
      data:  updateParishDto!.values,
    });
    return ParishEntity.fromObject(updateParish);
  }

  async create(created:CreateParishDto): Promise<ParishEntity> {
    const searchDiocese:DioceseEntity[] = await prisma.diocese.findMany();
    const result = await prisma.parish.create({
      data:{
        name:created.name,
        patron: created.patron,
        diocese_id: searchDiocese[1].id,
      }
    });
    
    const result_i = this.findById(result.id);
    return (result_i);
  }

  async delete(id:number): Promise<null> {
    await prisma.parish.delete({
      where:{
        id:id
      }
    })
    return null;
  }


}