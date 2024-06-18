import { RoleEntity } from "./role.entity";

export class UserEntity{
    constructor(
        public person_id: string,
        public Role_user: RoleEntity,
        public password: string|null,
        public status: boolean
    ){}
    public static FromDbAccess(object: {[key: string]: any}){
        const {person_id, Role_id, status} = object;
        
        return new UserEntity(person_id, Role_id, null, status)
    }


}
