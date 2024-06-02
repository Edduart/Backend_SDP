import { PermissionEntity } from "../entities/permission.entity";
import { RoleEntity } from "../entities/role.entity";
import { CreateRole_Struc } from "../dtos/role/create-role"
import { UpdateRole_struc } from "../dtos";
//en este archivo se hace abstracto todos los metodos que se vaya a usar 
export abstract class RoleDataSource{
/*este metodo es para crear un rol, se le envia un objeto rol que contiene la informacion a guardar en la db y retorna una promesa
del tipo de informacion que estamos manejando
*/
//a demas se le envia un array de numeros que contendrá los id de los permisos a asignar
    abstract create(data: CreateRole_Struc): Promise<RoleEntity>;
    abstract Update(nuevo: UpdateRole_struc): Promise<RoleEntity>;
    abstract getAll(): Promise<RoleEntity[]>;
    abstract getById(id: number): Promise<RoleEntity>;
    abstract Delete(id: number): Promise<null>;
    abstract GetAllPermissions(): Promise <PermissionEntity[]>;
}