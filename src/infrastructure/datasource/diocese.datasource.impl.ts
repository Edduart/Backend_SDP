//This is the controller 
import { prisma } from "../../data/postgres";
import {
  UpdateDioceseDto,
  DioceseDatasource,
  DioceseEntity,
  CreateDioceseDto,
} from "../../domain";



export class DioceseDatasourceImpl implements DioceseDatasource {

  async create(createDioceseDto: CreateDioceseDto): Promise<DioceseEntity> {
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

    async updateById(updateDioceseDto: UpdateDioceseDto): Promise<DioceseEntity> {
    await this.findById(updateDioceseDto.id);
    const updateDiocese = await prisma.diocese.update({
      where: { id: updateDioceseDto.id },
      data:  updateDioceseDto!.values,
    });
    return DioceseEntity.fromObject(updateDiocese);
  }

}