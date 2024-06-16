//This is the controller 
import { error } from "console";
import { prisma } from "../../data/postgres";
import {
  UpdateParishDto,
  ParishEntity,
  ParishDataSource,
  CreateParishDto,
  DeleteParish,
  DioceseEntity
} from "../../domain";
import { parish } from "@prisma/client";



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
    
      const searchDiocese: DioceseEntity[] = await prisma.diocese.findMany({
        where: {id: created.diocese_id}
      });
      if(searchDiocese.length==0) throw "No diocesis found";
      
      const result = await prisma.parish.create({
        data: {
          name: created.name,
          patron: created.patron,
          diocese_id: searchDiocese[0].id,
        },
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