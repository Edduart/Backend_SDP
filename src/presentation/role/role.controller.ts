import { Request, Response } from "express";
import { RoleRepository } from "../../domain";
import { GetRole } from "../../domain/useCases/role/getRole";
import { getById } from '../../domain/useCases/role/getById'
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


}
