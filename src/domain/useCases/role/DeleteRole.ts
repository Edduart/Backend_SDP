import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface DeleteRoleUseCare{
    execute(id: number): Promise<null>;
}

export class DeleteRole implements DeleteRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(id: number): Promise<null> {
      return this.repository.Delete(id);
    }
  }