import { PermissionEntity } from "../../entities/permission.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface GetPermissionseUseCare{
    execute(): Promise<PermissionEntity[]>;
}

export class GetAllPermissions implements GetPermissionseUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(): Promise<PermissionEntity[]> {
      return this.repository.GetAllPermissions();
    }
  }