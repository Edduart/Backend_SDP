import { GetStageOfSeminarianDto } from "../../dtos";
import { EnrollmentRepository } from "../../repositories";

interface getStageOfSeminarianUseCase {
  execute(dto: GetStageOfSeminarianDto): Promise<object>;
}
export class getStageOfSeminarian implements getStageOfSeminarianUseCase {
  constructor(private readonly repository: EnrollmentRepository) {}
  execute(dto: GetStageOfSeminarianDto): Promise<object> {
    return this.repository.getStageOfSeminarian(dto);
  }
}
