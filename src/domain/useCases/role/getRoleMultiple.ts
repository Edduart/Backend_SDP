import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface GetRoleUseCare{
    execute(id: number|undefined,name: string|undefined): Promise<RoleEntity[]>;
}

export class GetRole implements GetRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(id: number|undefined,name: string|undefined): Promise<RoleEntity[]> {
      return this.repository.getRoleMultiple(id, name);
    }
  }