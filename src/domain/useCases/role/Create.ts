import { CreateRole_Struc } from "../../dtos";
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role_repository";

export interface CreateRoleUseCare{
    execute(sper: CreateRole_Struc): Promise<RoleEntity>;
}

export class CreateRole implements CreateRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(sper: CreateRole_Struc): Promise<RoleEntity> {
      return this.repository.create(sper);
    }
  }