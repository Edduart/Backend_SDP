import { GetTestBySubjectDto } from "../../dtos";
import { TestRepository } from "../../repositories";

interface GetTestBySubjectUseCase {
  execute(dto: GetTestBySubjectDto): Promise<object>;
}

export class GetTestBySubject implements GetTestBySubjectUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: GetTestBySubjectDto): Promise<object> {
    return this.repository.getTestBySubject(dto);
  }
}
