import { prisma } from "../../data/postgres";
import { InstructorPositionDataSource, InstructorPositionEntity } from "../../domain";

export class InstructorPositionDataSourceImple
  implements InstructorPositionDataSource
{
  async getAll(): Promise<InstructorPositionEntity[]> {
    const getInstructorPositions = await prisma.instructor_position.findMany();
    return getInstructorPositions.map((InstructorPositions) =>
      InstructorPositionEntity.fromObject(InstructorPositions)
    );
  }

  async findById(id: number): Promise<InstructorPositionEntity> {
    const getInstructorPositionById = await prisma.instructor_position.findUnique({
      where: { id: id },
    });
    if (!getInstructorPositionById) throw "Instructor postion with ID: ${id} no found";
    return InstructorPositionEntity.fromObject(getInstructorPositionById);
  }
}
