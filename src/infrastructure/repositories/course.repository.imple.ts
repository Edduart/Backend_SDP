import {
  CreateCourseDto,
  CourseDatasource,
  CourseEntity,
  CourseRepository,
  UpdateCourseDto,
} from "../../domain";

export class CourseRepositoryImpl implements CourseRepository {
  constructor(private readonly datasource: CourseDatasource) {}

  create(createDto: CreateCourseDto): Promise<CourseEntity> {
    return this.datasource.create(createDto);
  }

  getAll(): Promise<CourseEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<CourseEntity> {
    return this.datasource.findById(id);
  }
  updateById(updateDto: UpdateCourseDto): Promise<CourseEntity> {
    return this.datasource.updateById(updateDto);
  }

  deleteById(id: number): Promise<CourseEntity> {
    return this.datasource.deleteById(id);
  }
}
