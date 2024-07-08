import { CourseEntity } from "../../entities";
import { CourseRepository } from "../../repositories";

export interface GetCourseUseCase {
  execute(id: number): Promise<CourseEntity>;
}

export class GetCourse implements GetCourseUseCase {
  constructor(private readonly repository: CourseRepository) {}

  execute(id: number): Promise<CourseEntity> {
    return this.repository.findById(id);
  }
}
