import { CreateCourseDto } from "../../dtos";
import { CourseEntity } from "../../entities";
import { CourseRepository } from "../../repositories";

export interface CreateCourseUseCase {
  execute(dto: CreateCourseDto): Promise<CourseEntity>;
}

export class CreateCourse implements CreateCourseUseCase {
  constructor(private readonly repository: CourseRepository) {}

  execute(dto: CreateCourseDto): Promise<CourseEntity> {
    return this.repository.create(dto);
  }
}
