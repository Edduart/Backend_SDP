import { UpdateCourseDto } from "../../dtos";
import { CourseEntity } from "../../entities";
import { CourseRepository } from "../../repositories";

export interface UpdateCourseUseCase {
  execute(dto: UpdateCourseDto): Promise<CourseEntity>;
}

export class UpdateCourse implements UpdateCourseUseCase {
  constructor(private readonly repository: CourseRepository) {}

  execute(dto: UpdateCourseDto): Promise<CourseEntity> {
    return this.repository.updateById(dto);
  }
}
