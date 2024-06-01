import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role_repository";

export interface CreateRoleUseCare{
    execute(name: string, description: string, numbers: number[]): Promise<RoleEntity>;
}

export class CreateRole implements CreateRoleUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(name: string, description: string, numbers: number[]): Promise<RoleEntity> {
      return this.repository.create(name,description,numbers);
    }
  }