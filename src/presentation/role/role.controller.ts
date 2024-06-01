import { Request, Response } from "express";
import { RoleRepository } from "../../domain";
import { GetRole } from "../../domain/useCases/role/getRole";
export class RoleController{

    constructor(private readonly repository: RoleRepository) {}
    public GetRole = (req: Request, res: Response) => {

        new GetRole(this.repository)
          .execute()
          .then((role) => res.json(role)) //check parameter
          .catch((error) => res.status(400).json({ error }));
      };



}
