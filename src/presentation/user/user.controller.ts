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
/*import { Change_use, Login, Login_Use, UserRepository } from "../../domain";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { Compare, Encode } from "../services/hash_handler";
import { ActualizarFecha } from "../../infrastructure";

export class UserControler{
    constructor(private readonly repository: UserRepository){}

    public Login = (req: Request, res: Response) => { 
        const acces_promts = new Login(req.body.id, req.body.password);
        new Login_Use(this.repository)
            .execute(acces_promts)
            .then((user) => {
                if(user == undefined) {
                    res.status(403).json("Datos de acceso invalidos").send;
                }else{
                    const result = Compare(acces_promts.password, user.password as string);
                    if(!result) {
                        res.status(403).json("Contraseña invalida").send;
                    }else{
                        ActualizarFecha(user.person_id);
                        user.password = null;
                        console.log({...user});
                        const token = jwt.sign({ ...user }, process.env.SECRET as string, {expiresIn: '30m'})
                        res.header('auth',token).set({'Access-Control-Expose-Headers': 'auth'}).json(user).send;
                    }
                }
            }) 
            .catch((error) => res.status(400).json({ error }));
    };
    

    public ChangePass = (req: Request, res: Response) => { 
        const new_pass = Encode(req.body.password);
        const acces_promts = new Login(req.body.id, new_pass);
        new Change_use(this.repository)
            .execute(acces_promts)
            .then((result) => {
                res.set({'Access-Control-Expose-Headers': 'auth'}).json("Contraseña cambiada").send;
            }) 
            .catch((error) => res.status(400).json({ error }));
    };
}*/