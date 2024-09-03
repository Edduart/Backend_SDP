import { CreateEnrollmentByEquivalenceDto } from "../../dtos";
import { EnrollmentRepository } from "../../repositories";

interface CreateEnrollmentByEquivalenceUseCase {
  execute(dto: CreateEnrollmentByEquivalenceDto): Promise<object>;
}

export class CreateEnrollmentByEquivalence
  implements CreateEnrollmentByEquivalenceUseCase
{
  constructor(private readonly repository: EnrollmentRepository) {}

  execute(dto: CreateEnrollmentByEquivalenceDto): Promise<object> {
    return this.repository.createByEquivalence(dto);
  }
}
