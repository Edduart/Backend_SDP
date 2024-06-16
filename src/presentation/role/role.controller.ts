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


export class RoleController{
    constructor(private readonly repository: RoleRepository) {}
      
      public getRoleMultiple = (req: Request, res: Response) => {
        //si el id es string y mayor a 0 caracteres, y no es numero entonces se manda undefined, si es number tambien se manda el id convertido en numero
        const id = typeof req.query.id === 'string' && req.query.id.length > 0 &&!Number.isNaN(Number(req.query.id)) ? parseInt(req.query.id) : undefined;
        //confirma que la query sea string, este entre 1 y 99 caracteres y retorna el string o undefined
        const name = typeof req.query.name === 'string' && req.query.name.length < 100 &&  req.query.name.length > 1? req.query.name : undefined;

        new GetRole(this.repository)
          .execute(id, name)
          .then((role) => res.json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));
      };
      public createRole = (req: Request, res: Response) => {
        const [ error, CreateRole_ ] = CreateRoleStruc.Create( req.body );
        if ( error ) return res.status( 400 ).json( { error } );
          new CreateRole(this.repository)
            .execute(CreateRole_!)
            .then((role) => res.json(role)) //check parameter
            .catch((error) => res.status(400).json({ error }));
      };
      public deleteRole = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        new DeleteRole(this.repository)
            .execute(id)
            .then((role) => res.json(role)) //check parameter
            .catch((error) => res.status(400).json({ error }));
      };
      public getAllPermissions = (req: Request, res: Response) => {
        new GetAllPermissions(this.repository)
          .execute()
          .then((role) => res.json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));
      };
      public UpdateRole = (req: Request, res: Response) => {
        const [ error, nuevo ] = UpdateRoleStruc.Create( req.body );
        if ( error ) return res.status( 400 ).json( { error } ); 
        new UpdateRole(this.repository)
          .execute(nuevo!)
          .then((role) => res.json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));
      };
              
}
