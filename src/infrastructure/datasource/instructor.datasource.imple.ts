import { instructor_position } from "@prisma/client";
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
      data: {
        professor_id: createDto.professor_id,
        status: createDto.status,
        starting_date: createDto.starting_date,
        instructor_position:
          createDto.instructor_position as instructor_position,
      },
    });
    return InstructorEntity.fromObject(createInstructor);
  }
  async updateById(updateDto: UpdateInstructorDto): Promise<InstructorEntity> {
    console.log(updateDto);
    const updateInstructor = await prisma.instructor.update({
      where: { professor_id: updateDto.professor_id },
      data: {
        starting_date: updateDto.starting_date,
        instructor_position:
          updateDto.instructor_position as instructor_position,
        status: updateDto.status,
      },
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
      where: { professor_id: id },
    });
    return InstructorEntity.fromObject(deteleInstructor);
  }
}
