import { GetAcademicTermByEnrollmentDto, academicTermMap } from "../../dtos";
import { EnrollmentRepository } from "../../repositories";

interface GetAcademicTermByEnrollmentUseCase {
  execute(dto: GetAcademicTermByEnrollmentDto): Promise<academicTermMap[]>;
}

export class GetAcademicTermByEnrollment
  implements GetAcademicTermByEnrollmentUseCase
{
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: GetAcademicTermByEnrollmentDto): Promise<academicTermMap[]> {
    return this.repository.getAcademicTermByEnrollment(dto);
  }
}
