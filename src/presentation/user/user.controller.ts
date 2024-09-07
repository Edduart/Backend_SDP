import {
  Change_use,
  Login,
  Login_Use,
  UserRepository,
  UserTrans,
  GetUsers,
  GetUserbyId,
  GetUsersByType,
  Restart_use,
  CreateLog,
  BitacoraRepository,
  BitacoraLog,
  actions_enum,
} from "../../domain";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { compare, encode } from "../services/hashHandler";
import { ActualizarFecha } from "../../infrastructure";
import { ValidatePermission } from "../services/permissionValidator";
import { BitacoraDataSourceImpl } from "../../infrastructure/datasource/bitacora.datasource.imple";
import { BitacoraRepositoryImpl } from "../../infrastructure/repositories/bitacora.repository.imple";

export class UserControler {
  constructor(private readonly repository: UserRepository) {
  }

  public getByType = async (req: Request, res: Response) => {
    const {type} = req.query;
    new GetUsersByType(this.repository)
      .execute(String(type))
      .then((users) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(users)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  

  public getById = (req: Request, res: Response) => {
    const id: string = req.params.id;
    new GetUserbyId(this.repository)
      .execute(id)
      .then((user) =>{
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Usuario encontrado", user })}
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getAll = (req: Request, res: Response) => {
    try{
      console.log("validando")
      const result = ValidatePermission(req.body.Permisos, "USER", 'R');
      console.log("entro")
      new GetUsers(this.repository)
      .execute()
      .then((users) =>{
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(users)
    }).catch((error) => res.status(400).json({ error }));
    }catch(error){
      res.status(400).json({ error })
    }
    
  };

  public Login = (req: Request, res: Response) => {
    const acces_promts = new Login(req.body.id, req.body.password);
    new Login_Use(this.repository)
      .execute(acces_promts)
      .then(async (user) => {
        if (user == undefined) {
          res.status(403).json("Datos de acceso invalidos").send;
        } else {
          const result = await compare(
            acces_promts.password,
            user.password as string
          );
          if (!result) {
            res.status(403).json("Contraseña invalida").send;
          } else {
            ActualizarFecha(user.person_id);
            const user_to_send = new UserTrans(
              user.person_id,
              user.role.premissions,
              user.fecha,
              user.role.name, user.forename, user.surname, user.profile_picture
            );
            const token = jwt.sign(
              { ...user_to_send },
              process.env.SECRET as string,
              { expiresIn: "30m" }
            );
            const datasource = new BitacoraDataSourceImpl();
            const Repository = new BitacoraRepositoryImpl(datasource);
            new CreateLog(Repository).execute(new BitacoraLog(new Date(),
          user.person_id,
        "USER",
      actions_enum.LOGIN,))
            res
              .header("auth", token)
              .set({ "Access-Control-Expose-Headers": "auth" })
              .json(user_to_send).send;
          }
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };
  public Reset = async (req: Request, res: Response) => {
    const source = req.headers['Permissions'];
    const user = req.headers['User'];
    try{
      const result = ValidatePermission(source, "USER", 'U'); 
      new Restart_use(this.repository)
      .execute(req.body.id)
      .then((result) => {
        const datasource = new BitacoraDataSourceImpl();
            const Repository = new BitacoraRepositoryImpl(datasource);
            new CreateLog(Repository).execute(new BitacoraLog(new Date(),
            user as string,
        "USER",
      actions_enum.UPDATE,))
        res
          .json("Contraseña cambiada").send;
      })
      .catch((error) => res.status(400).json({ error }));
    }catch(error){
      console.log("unexpected error while executing");
      res.status(418).send("Error: " + error);
    }
    
  };
  public ChangePass = async (req: Request, res: Response) => {
    const new_pass = encode(req.body.password);
    const acces_promts = new Login(req.body.id, await new_pass);
    new Change_use(this.repository)
      .execute(acces_promts)
      .then((result) => {
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json("Contraseña cambiada").send;
      })
      .catch((error) => res.status(400).json({ error }));
  };
}
