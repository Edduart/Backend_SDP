import { GetAverageGradeBySubjectDto } from "../../dtos";
import { TestRepository } from "../../repositories";

interface GetAverageGradeBySubjectUseCase {
  execute(dto: GetAverageGradeBySubjectDto): Promise<object[]>;
}

export class GetAverageGradeBySubject implements GetAverageGradeBySubjectUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: GetAverageGradeBySubjectDto): Promise<object[]> {
    return this.repository.getAverageGradeBySubject(dto);
  }
}
