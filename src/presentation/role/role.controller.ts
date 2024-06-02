import { Request, Response } from "express";

/*
import { RoleRepository, UpdateRole_struc } from "../../domain";

import { GetRole } from "../../domain/useCases/role/getRole";
import { getById } from '../../domain/useCases/role/getById';
import { DeleteRole } from "../../domain/useCases/role/deleteRole";
import { CreateRole } from '../../domain/useCases/role/create'
import { RoleEntity } from "../../domain/entities/role.entity";
import { CreateRole_Struc } from "../../domain/dtos/role/create.role";
import { GetAllPermissions } from "../../domain/useCases/role/getPermission";
import { UpdateRole } from "../../domain/useCases/role/update";*/

import {
  GetRole,
  getById,
  DeleteRole,
  CreateRole,
  RoleEntity,
  GetAllPermissions,
  UpdateRole,
  CreateRoleStruc,
  RoleRepository,
  UpdateRoleStruc,
} from "../../domain";


export class RoleController{

    constructor(private readonly repository: RoleRepository) {}
    public GetRole = (req: Request, res: Response) => {

        new GetRole(this.repository)
          .execute()
          .then((role) => res.json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));
      };
    public getById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new getById(this.repository)
            .execute(id)
            .then((role) => res.json(role)) //check parameter
            .catch((error) => res.status(400).json({ error }));
        };
        public CreateRole = (req: Request, res: Response) => {
            const [ error, CreateRole_ ] = CreateRoleStruc.Create( req.body );
            if ( error ) return res.status( 400 ).json( { error } );
            new CreateRole(this.repository)
                .execute(CreateRole_!)
                .then((role) => res.json(role)) //check parameter
                .catch((error) => res.status(400).json({ error }));
            };
            public DeleteRole = (req: Request, res: Response) => {
                const id = parseInt(req.params.id);
                new DeleteRole(this.repository)
                  .execute(id)
                  .then((role) => res.json(role)) //check parameter
                  .catch((error) => res.status(400).json({ error }));
              };
              public GetAllPermissions = (req: Request, res: Response) => {
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
