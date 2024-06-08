import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface getOneUseCare{
    execute(id: number|null, name: string|null): Promise<RoleEntity>;
}

export class getOne implements getOneUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(id: number|null,name: string|null): Promise<RoleEntity> {
      return this.repository.getOne(id,name);
    }
  }