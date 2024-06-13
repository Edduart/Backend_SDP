import { prisma } from "../../data/postgres";
import {
  UpdateCourseDto,
  CourseDatasource,
  CourseEntity,
  CreateCourseDto,
} from "../../domain";

export class CourseDataSourceImpl implements CourseDatasource {
  async create(createDto: CreateCourseDto): Promise<CourseEntity> {
    const createCourse = await prisma.course.create({
      data: createDto!,
    });
    return CourseEntity.fromObject(createCourse);
  }

  async getAll(): Promise<CourseEntity[]> {
    const courses = await prisma.course.findMany();
    return courses.map((courses) => CourseEntity.fromObject(courses));
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
    const updateCourse = await prisma.course.update({
      where: { id: updateDto.id },
      data: updateDto!.values,
    });
    return CourseEntity.fromObject(updateCourse);
  }

  async deleteById(id: number): Promise<CourseEntity> {
    await this.findById(id);
    const deleteCourse = await prisma.course.delete({
      where: { id: id },
    });
    return CourseEntity.fromObject(deleteCourse);
  }
}
