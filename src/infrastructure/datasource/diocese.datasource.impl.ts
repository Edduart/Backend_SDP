import { prisma } from "../../data/postgres";
import {
  UpdateDioceseDto,
  DioceseDatasource,
  DioceseEntity,
  CreateDioceseDto,
} from "../../domain";

export class DioceseDataSourceImpl implements DioceseDatasource {
  async create(createDioceseDto: CreateDioceseDto): Promise<DioceseEntity> {
    const check: DioceseEntity[] = await this.getByName(createDioceseDto.name);
    const dioceseExist = check.find(
      (item) => item.name === createDioceseDto.name
    );
    if (dioceseExist)
      throw `Diocese with name: ${createDioceseDto.name}, already exist`;
    const createDiocese = await prisma.diocese.create({
      data: createDioceseDto!,
    });
    return DioceseEntity.fromObject(createDiocese);
  }

  async getAll(): Promise<DioceseEntity[]> {
    const dioceses = await prisma.diocese.findMany();
    return dioceses.map((diocese) => DioceseEntity.fromObject(diocese));
  }

  async findById(id: number): Promise<DioceseEntity> {
    const diocese = await prisma.diocese.findUnique({
      where: {
        id: id,
      },
    });
    if (!diocese) throw `Diocese with id ${id} not found`;
    return DioceseEntity.fromObject(diocese);
  }

  async getByName(name: string): Promise<DioceseEntity[]> {
    const dioceseByName = await prisma.diocese.findMany({
      where: {
        name: { contains: name },
      },
    });
    return dioceseByName.map((diocese) => DioceseEntity.fromObject(diocese));
  }

  async updateById(updateDioceseDto: UpdateDioceseDto): Promise<DioceseEntity> {
    /* 
    const check: DioceseEntity[] = await this.getByName(updateDioceseDto.name);
    const dioceseExist = check.find(
      (item) => item.name === updateDioceseDto.name
    );
    if (dioceseExist)
      throw `Diocese with name: ${updateDioceseDto.name}, already exist`;
    */
    await this.findById(updateDioceseDto.id);
    const result = await prisma.diocese.findFirst({
      where: { name: updateDioceseDto.name, id: { not: updateDioceseDto.id } },
    });
    if (result != null) {
      throw "diocese with same name already exists";
    }

    const updateDiocese = await prisma.diocese.update({
      where: { id: updateDioceseDto.id },
      data: updateDioceseDto!.values,
    });
    return DioceseEntity.fromObject(updateDiocese);
  }

  async deleteById(id: number): Promise<DioceseEntity> {
    const checkIfHaveParish = await prisma.parish.findMany({
      where: { diocese_id: id },
    });
    if (checkIfHaveParish.length > 0)
      throw `Unable to delete this record, there are parishes with this diocese`;
    await this.findById(id);
    const deleteDiocese = await prisma.diocese.delete({
      where: { id: id },
    });
    return DioceseEntity.fromObject(deleteDiocese);
  }
}
