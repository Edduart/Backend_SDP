import { Request, Response } from "express";
import {
  GetRole,
  DeleteRole,
  CreateRole,
  RoleEntity,
  GetAllPermissions,
  UpdateRole,
  CreateRoleStruc,
  RoleRepository,
  UpdateRoleStruc,
} from "../../domain";
import { matchedData } from "express-validator";
import { ValidatePermission } from "../services/permissionValidator";


export class RoleController{
    constructor(private readonly repository: RoleRepository) {}
      
      public getRoleMultiple = (req: Request, res: Response) => {
        //si el id es string y mayor a 0 caracteres, y no es numero entonces se manda undefined, si es number tambien se manda el id convertido en numero
        const id = typeof req.query.id === 'string' && req.query.id.length > 0 &&!Number.isNaN(Number(req.query.id)) ? parseInt(req.query.id) : undefined;
        //confirma que la query sea string, este entre 1 y 99 caracteres y retorna el string o undefined
        const name = typeof req.query.name === 'string' && req.query.name.length < 100 &&  req.query.name.length > 1? req.query.name : undefined;
        try {
          //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
          const result = ValidatePermission(req.body.Permisos, "USER", 'R');
          //aqui empieza el contenido del controlador
          new GetRole(this.repository)
          .execute(id, name)
          .then((role) => res.set({'Access-Control-Expose-Headers': 'auth'}).json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));

        } catch (error) {
          res.status(400).json("Acces denied");
        }        
      };
      public createRole = (req: Request, res: Response) => {
        try {
          //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "USER", 'C');
          //aqui empieza el contenido del controlador
          const [ error, CreateRole_ ] = CreateRoleStruc.Create( req.body );
          if ( error ) return res.status( 400 ).json( { error } );
            new CreateRole(this.repository)
              .execute(CreateRole_!)
              .then((role) => res.set({'Access-Control-Expose-Headers': 'auth'}).json(role)) //check parameter
              .catch((error) => res.status(400).json({ error }));     
          } catch (error) {
            res.status(400).json("Acces denied");
          }
      };
      public deleteRole = (req: Request, res: Response) => {
        try {
          //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "USER", 'D');
          //aqui empieza el contenido del controlador
          const id = parseInt(req.params.id);
          new DeleteRole(this.repository)
              .execute(id)
              .then((role) => res.json(role)) //check parameter
              .catch((error) => res.set({'Access-Control-Expose-Headers': 'auth'}).status(400).json({ error }));     
          } catch (error) {
            res.status(400).json("Acces denied");
          }
      };
      public getAllPermissions = (req: Request, res: Response) => {
        try {
          //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "USER", 'R');
          //aqui empieza el contenido del controlador
          new GetAllPermissions(this.repository)
          .execute()
          .then((role) => res.set({'Access-Control-Expose-Headers': 'auth'}).json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));  
          } catch (error) {
            res.status(400).json("Acces denied");
          }
      };
      public UpdateRole = (req: Request, res: Response) => {
        try {
          //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "USER", 'U');
          //aqui empieza el contenido del controlador
          const [ error, nuevo ] = UpdateRoleStruc.Create( req.body );
          if ( error ) return res.status( 400 ).json( { error } ); 
          new UpdateRole(this.repository)
            .execute(nuevo!)
            .then((role) => res.set({'Access-Control-Expose-Headers': 'auth'}).json(role)) //check parameter
            .catch((error) => res.status(400).json({ error }));  
          } catch (error) {
            res.status(400).json("Acces denied");
          }
      };
              
}
