import { RoleEntity } from "../../entities/role.entity";
import { RoleRepository } from "../../repositories/role.repository";

export interface getOneUseCare{
    execute(id: number|undefined,namesur: string|undefined): Promise<RoleEntity[]>;
}

export class getOne implements getOneUseCare {
    constructor(private readonly repository: RoleRepository) {}
  
    execute(id: number|undefined,namesur: string|undefined): Promise<RoleEntity[]> {
      return this.repository.getOne(id,namesur);
    }
  }