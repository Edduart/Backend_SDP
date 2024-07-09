import { prisma } from "../../data/postgres";
import {
  InstructorPositionDataSource,
  InstructorPositionEntity,
} from "../../domain";

export class InstructorPositionDataSourceImple
  implements InstructorPositionDataSource
{
  async getAll(): Promise<InstructorPositionEntity[]> {
    throw "no usefful, delete";
  }

  async findById(id: number): Promise<InstructorPositionEntity> {
    throw "no usefful, delete";
  }
}
