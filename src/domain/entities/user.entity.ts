import { PermissionEntity } from "./permission.entity";


export class UserEntity{
    constructor(
        public person_id: string,
        public Permisos: PermissionEntity[],
        public password: string|null,
        public status: boolean
    ){}
    public static FromDbAccess(object: {[key: string]: any}){
        const {person_id, Role_id, status} = object;
        
        return new UserEntity(person_id, Role_id, null, status)
    }


}
