import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role_repository";

export interface UpdateRoleUseCare{
    execute(nuevo: RoleEntity): Promise<RoleEntity>;
}

export class UpdateRole implements UpdateRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(nuevo: RoleEntity): Promise<RoleEntity> {
      return this.repository.Update(nuevo);
    }
  }