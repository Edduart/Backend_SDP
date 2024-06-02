import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface getByIdUseCare{
    execute(id: number): Promise<RoleEntity>;
}

export class getById implements getByIdUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute( id: number ): Promise<RoleEntity> {
      return this.repository.getById(id);
    }
  }