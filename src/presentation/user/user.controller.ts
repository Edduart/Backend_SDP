import { Request, Response } from "express";
import {
  GetUsers,
  UserRepository,
} from "../../domain";

export class UserController {
  constructor(private readonly repository: UserRepository) {}
  public getUsers = (req: Request, res: Response) => {
    new GetUsers(this.repository)
      .execute()
      .then((users) => {
        if (users.length == 0) {
          res.json({ msj: "No se a registrado ningun usuario" });
        } else {
          res.json(users);
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };
}
