import { Request, Response } from "express";
import { RoleRepository } from "../../domain";
import { GetRole } from "../../domain/useCases/role/getRole";
import { getById } from '../../domain/useCases/role/getById';
import { DeleteRole } from "../../domain/useCases/role/DeleteRole";
import { CreateRole } from '../../domain/useCases/role/Create'
import { RoleEntity } from "../../domain/entities/role.entity";
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
            const name = req.body.name;
            const description = req.body.description;
            const numbers: number[] = req.body.numbers;
            new CreateRole(this.repository)
                .execute(name,description,numbers)
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
}
