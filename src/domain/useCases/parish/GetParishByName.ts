import { ParishEntity } from "../../entities";
import { ParishRepository } from "../../repositories";

export interface GetParishByName {
  execute(name: string): Promise<ParishEntity[]>;
}

export class GetParishByname implements GetParishByName {
  constructor(private readonly repository: ParishRepository) {}

  execute(name: string): Promise<ParishEntity[]> {
    return this.repository.getByName(name);
  }
}
