import { prisma } from "../../data/postgres";
import {
  CreateInstructorDto,
  InstructorDataSource,
  InstructorEntity,
  UpdateInstructorDto,
} from "../../domain";

export class InstructorDataSourceImple implements InstructorDataSource {
  async create(createDto: CreateInstructorDto): Promise<InstructorEntity> {
    const createInstructor = await prisma.instructor.create({
      data: createDto!,
    });
    return InstructorEntity.fromObject(createInstructor);
  }
  async updateById(updateDto: UpdateInstructorDto): Promise<InstructorEntity> {
    const updateInstructor = await prisma.instructor.update({
      where: { professor_id: updateDto.professor_id },
      data: updateDto!.values,
    });
    return InstructorEntity.fromObject(updateInstructor);
  }
  async getAll(): Promise<InstructorEntity[]> {
    const getInstructors = await prisma.instructor.findMany();
    return getInstructors.map((Instructors) =>
      InstructorEntity.fromObject(Instructors)
    );
  }
  async findById(id: string): Promise<InstructorEntity> {
    const getInstructorById = await prisma.instructor.findUnique({
      where: { professor_id: id },
    });
    if (!getInstructorById) throw "Instructor with ID: ${id} no found";
    return InstructorEntity.fromObject(getInstructorById);
  }
  async deleteById(id: string): Promise<InstructorEntity> {
    const deteleInstructor = await prisma.instructor.delete({
      where: {professor_id: id}
    })
    return InstructorEntity.fromObject(deteleInstructor);
  }
}
