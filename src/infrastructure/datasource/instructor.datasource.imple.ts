import { prisma } from "../../data/postgres";
import {
  InstructorDataSource,
  InstructorEntity,
} from "../../domain";

export class InstructorDataSourceImple implements InstructorDataSource {
  async getAll(): Promise<InstructorEntity[]> {
    const getInstructors = await prisma.instructor.findMany();
    return getInstructors.map((Instructors) =>
      InstructorEntity.fromObject(Instructors)
    );
  }

  async findById(id: string): Promise<InstructorEntity> {
    const getInstructorById =
      await prisma.instructor.findUnique({
        where: { professor_id: id },
      });
    if (!getInstructorById) throw "Instructor with ID: ${id} no found";
    return InstructorEntity.fromObject(getInstructorById);
  }
}
