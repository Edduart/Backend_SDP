//This is the controller
import { prisma } from "../../data/postgres";
import {
  UpdateParishDto,
  ParishEntity,
  ParishDataSource,
  CreateParishDto,
  DioceseEntity,
} from "../../domain";

export class ParishDatasourceimpl implements ParishDataSource {
  async getByDioceseId(id: number): Promise<ParishEntity[]> {
    const parishes = await prisma.parish.findMany({
      where: { diocese_id: id },
    });
    if (parishes.length == 0) throw "No parishes found with the given ID found";
    return parishes.map((parishes) => ParishEntity.fromObject(parishes));
  }

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

  async getByName(name: string): Promise<ParishEntity[]> {
    const parishByname = await prisma.parish.findMany({
      where: {
        name: { contains: name },
      },
    });
    return parishByname.map((parish) => ParishEntity.fromObject(parish));
  }

  async updateById(updateParishDto: UpdateParishDto): Promise<ParishEntity> {
    await this.findById(updateParishDto.id);
    const updateParish = await prisma.parish.update({
      where: { id: updateParishDto.id },
      data: updateParishDto!.values,
    });
    return ParishEntity.fromObject(updateParish);
  }

  async create(created: CreateParishDto): Promise<ParishEntity> {
    const searchDiocese: DioceseEntity[] = await prisma.diocese.findMany({
      where: { id: created.diocese_id },
    });
    if (searchDiocese.length == 0) throw "No diocesis found";

    const result = await prisma.parish.create({
      data: {
        name: created.name,
        patron: created.patron,
        diocese_id: searchDiocese[0].id,
      },
    });

    const result_i = this.findById(result.id);
    return result_i;
  }

  async delete(id: number): Promise<null> {
    const user_with_parish = await prisma.user.findMany({where: {parish_id: id}});
    if(user_with_parish.length > 0)throw `Unable to delete this record, there are user with this parish`;
    await prisma.parish.delete({where: {id: id,},});
    return null;
  }
}
