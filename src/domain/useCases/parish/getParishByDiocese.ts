import { ParishEntity } from "../../entities";
import { ParishRepository } from "../../repositories";

export interface GetByDiocese {
  execute(id: number): Promise<ParishEntity[]>;
}

export class GetByDiocese implements GetByDiocese {
  constructor(private readonly repository: ParishRepository) {}

  execute(id: number): Promise<ParishEntity[]> {
    return this.repository.getByDioceseId(id);
  }
}
