import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface GetRoleUseCare{
    execute(): Promise<RoleEntity[]>;
}

export class GetRole implements GetRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(): Promise<RoleEntity[]> {
      return this.repository.getAll();
    }
  }