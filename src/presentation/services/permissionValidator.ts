import { PermissionEntity } from "../../domain";

export function ValidatePermission(_data: any, _table: string, _type: string){
    const permissions: PermissionEntity[] = _data.map((permiso: { id: any; name: any; type: any; table: any; }) => {
        return PermissionEntity.fromdb({
          id:     permiso.id,
          name:   permiso.name,
          type:   permiso.type, 
          table:  permiso.table,
        });
      });
      const result = permissions.find((PermissionEntity)=>(PermissionEntity.table == _table && PermissionEntity.type == _type) || (PermissionEntity.id == 30));
      if(result == undefined) {
        throw new Error("Denied as not allowed");
      } else return true;
}