import { ParishEntity } from "./parish.entity";
import { RoleEntity } from "./role.entity";



export class User_Entity{
    constructor(
        public person_id: string,
        public status: boolean,
        public parish: ParishEntity,
        public password: string|null,
        public role: RoleEntity,
        public fecha: Date|null
    ){}

    public static FromDbAccess(object: {[key: string]: any}){
        const {person_id, status, parish, password, role, fecha} = object;
        const parish_obj = ParishEntity.fromObject(parish);
        const role_obj = RoleEntity.fromdb(role);
        const date_obj = new Date(fecha);
        return new User_Entity(person_id, status, parish_obj, password, role_obj, date_obj)
    }


}
 