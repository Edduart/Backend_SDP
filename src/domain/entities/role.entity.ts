import { PermissionEntity } from "./permission.entity";

export class RoleEntity{
    constructor(
        public id: number, 
        public name: string, 
        public description: string,
        public premissions: PermissionEntity[]
    ){}

    public static fromdb(object: {[key: string]: any}){
        const {id, name, description, premissions} = object;
        return new RoleEntity( id, name, description, premissions)
    }
}

