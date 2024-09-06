import { prisma } from "../../data/postgres";
import {
  UpdateCourseDto,
  CourseDatasource,
  CourseEntity,
  CreateCourseDto,
} from "../../domain";

export class CourseDataSourceImpl implements CourseDatasource {
  async create(createDto: CreateCourseDto): Promise<CourseEntity> {
    // TODO delete this from the code
    const createCourse = await prisma.course.create({
      data: createDto!,
    });
    return CourseEntity.fromObject(createCourse);
  }

  async getAll(): Promise<CourseEntity[]> {
    const courses = await prisma.course.findMany();
    console.log(courses);
    const result: CourseEntity[] = courses.map((courses) => {
      return CourseEntity.fromObject(courses);
    });
    console.log(result);
    return result;
  }

  async findById(id: number): Promise<CourseEntity> {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
    });
    if (!course) throw `Course with id ${id} not found`;
    return CourseEntity.fromObject(course);
  }

  async updateById(updateDto: UpdateCourseDto): Promise<CourseEntity> {
    console.log(
      "🚀 ~ CourseDataSourceImpl ~ updateById ~ updateDto:",
      updateDto
    );

    if (updateDto.instructor_id) {
      const checkInstructor = await prisma.instructor.findUnique({
        where: {
          professor_id: updateDto.instructor_id,
          NOT: { OR: [{ instructor_position: "DESACTIVADO" }, { status: 0 }] },
        },
      });
      if (!checkInstructor)
        throw `instructor ID ${updateDto.instructor_id} does'nt exist or is disabled`;
    }

    await this.findById(updateDto.id);
    const updateCourse = await prisma.course.update({
      where: { id: updateDto.id },
      data: {
        instructor_id: updateDto.instructor_id,
      },
    });
    return CourseEntity.fromObject(updateCourse);
  }

  async deleteById(id: number): Promise<CourseEntity> {
    // TODO delete this from the code
    await this.findById(id);
    const deleteCourse = await prisma.course.delete({
      where: { id: id },
    });
    return CourseEntity.fromObject(deleteCourse);
  }
}
