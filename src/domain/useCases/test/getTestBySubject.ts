import { GetTestBySubjectDto, EnrollmentTestResult } from "../../dtos";
import { TestRepository } from "../../repositories";

interface GetTestBySubjectUseCase {
  execute(dto: GetTestBySubjectDto): Promise<EnrollmentTestResult[]>;
}

export class GetTestBySubject implements GetTestBySubjectUseCase {
  constructor(private readonly repository: TestRepository) {}

  execute(dto: GetTestBySubjectDto): Promise<EnrollmentTestResult[]> {
    return this.repository.getTestBySubject(dto);
  }
}
