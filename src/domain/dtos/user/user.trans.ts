import { PermissionEntity } from "../../entities";

export class UserTrans{
    constructor(
        public person_id: string,
        public Permisos: PermissionEntity[],
        public fecha: Date | null,
        public role: string,
      ) {}
}