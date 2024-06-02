import { UpdateRoleStruc } from "../../dtos";
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface UpdateRoleUseCare{
    execute(nuevo: UpdateRoleStruc): Promise<RoleEntity>;
}

export class UpdateRole implements UpdateRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(nuevo: UpdateRoleStruc): Promise<RoleEntity> {
      return this.repository.Update(nuevo);
    }
  }