import { CreateRoleStruc } from "../../dtos";
import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface CreateRoleUseCare{
    execute(sper: CreateRoleStruc): Promise<RoleEntity>;
}

export class CreateRole implements CreateRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(sper: CreateRoleStruc): Promise<RoleEntity> {
      return this.repository.create(sper);
    }
  }