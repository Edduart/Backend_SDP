import { CourseEntity } from "../../entities";
import { CourseRepository } from "../../repositories";

export interface DeleteCourseUseCase {
  execute(id: number): Promise<CourseEntity>;
}

export class DeleteCourse implements DeleteCourseUseCase {
  constructor(private readonly repository: CourseRepository) {}

  execute(id: number): Promise<CourseEntity> {
    return this.repository.deleteById(id);
  }
}
