import { PermissionEntity, RoleEntity } from "../entities";
import { CreateRoleStruc, UpdateRoleStruc } from "../dtos/";
//en este archivo se hace abstracto todos los metodos que se vaya a usar 
export abstract class RoleDataSource{
/*este metodo es para crear un rol, se le envia un objeto rol que contiene la informacion a guardar en la db y retorna una promesa
del tipo de informacion que estamos manejando
*/
//a demas se le envia un array de numeros que contendrá los id de los permisos a asignar
    abstract create(data: CreateRoleStruc): Promise<RoleEntity>;
    abstract Update(nuevo: UpdateRoleStruc): Promise<RoleEntity>;
    abstract getRoleMultiple(id: number|undefined,name: string|undefined): Promise<RoleEntity[]>;
    abstract Delete(id: number): Promise<null>;
    abstract GetAllPermissions(): Promise <PermissionEntity[]>;
}