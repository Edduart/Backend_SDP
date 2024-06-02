import { UpdateRole_struc } from "../../dtos";
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role_repository";

export interface UpdateRoleUseCare{
    execute(nuevo: UpdateRole_struc): Promise<RoleEntity>;
}

export class UpdateRole implements UpdateRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(nuevo: UpdateRole_struc): Promise<RoleEntity> {
      return this.repository.Update(nuevo);
    }
  }