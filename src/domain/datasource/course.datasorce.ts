import { CourseEntity } from "../entities";
import {
  UpdateCourseDto,
  CreateCourseDto,
} from "../dtos";

export abstract class CourseDatasource {
  abstract create(dto: CreateCourseDto): Promise<CourseEntity>;
  abstract getAll(): Promise<CourseEntity[]>;
  abstract findById(id: number): Promise<CourseEntity>;
  abstract updateById(dto: UpdateCourseDto): Promise<CourseEntity>;
  abstract deleteById(id: number): Promise<CourseEntity>;
}
