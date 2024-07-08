import { CourseEntity } from "../../entities";
import { CourseRepository } from "../../repositories";

export interface GetCoursesUseCase {
  execute(): Promise<CourseEntity[]>;
}

export class GetCourses implements GetCoursesUseCase {
  constructor(private readonly repository: CourseRepository) {}

  execute(): Promise<CourseEntity[]> {
    return this.repository.getAll();
  }
}
