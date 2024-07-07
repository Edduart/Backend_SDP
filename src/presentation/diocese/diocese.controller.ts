import { Request, Response } from "express";

import {
  CreateDioceseDto,
  CreateDiocese,
  GetDioceses,
  GetDiocese,
  GetDioceseByName,
  UpdateDiocese,
  DioceseRepository,
  UpdateDioceseDto,
  DeleteDiocese,
} from "../../domain";
import { ValidatePermission } from "../services/permissionValidator";

export class DioceseController {
  constructor(private readonly dioceseRepository: DioceseRepository) {}
  public getDioceses = (req: Request, res: Response) => {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "user", 'R');
      //aqui empieza el contenido del controlador
      new GetDioceses(this.dioceseRepository)
      .execute()
      .then((dioceses) => res.json(dioceses)) //check parameter
      .catch((error) => res.status(400).json({ error }));     
      } catch (error) {
        res.status(400).json("Acces denied");
      }
    
  };

  public getDioceseById = (req: Request, res: Response) => {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "user", 'R');
      //aqui empieza el contenido del controlador
      const id = +req.params.id;

      new GetDiocese(this.dioceseRepository)
        .execute(id)
        .then((diocese) =>
          res.json({
            mjs: "Diosesis ID:" + diocese.id + ", encontrada exitosamente!",
            diocese,
          })
        )
        .catch((error) => res.status(400).json({ error }));    
      } catch (error) {
        res.status(400).json("Acces denied");
      }
  };

  public getDioceseByName = (req: Request, res: Response) => {
    const name = req.params.name;

    const result = ValidatePermission(req.body.Permisos, "user", "R");

    new GetDioceseByName(this.dioceseRepository)
      .execute(name)
      .then((diocese) => {
        if (diocese.length == 0) {
          res.json({
            msj: "No se encontro ninguna conincidencia con: " + name,
          });
        } else {
          res.set({'Access-Control-Expose-Headers': 'auth'}).json({
            msj: "coincidencias con la palabra: " + name,
            diocese,
          });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };

  public updateDioceseById = (req: Request, res: Response) => {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "user", 'U');

      //aqui empieza el contenido del controlador
      const id = +req.params.id;
      const [error, updateDioceseDto] = UpdateDioceseDto.update({
        ...req.body,
        id,
      });
  
      if (error) return res.status(400).json({ error });
  
      new UpdateDiocese(this.dioceseRepository)
        .execute(updateDioceseDto!)
        .then((diocese) =>
          res.json({
            msj: "Diocese ID:" + diocese.id + ", actualizada correctamente!",
            diocese,
          })
        )
        .catch((error) => res.status(400).json({ error }));    
      } catch (error) {
        res.status(400).json("Acces denied");
      }
  };

  public createDiocese = (req: Request, res: Response) => {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
      const result = ValidatePermission(req.body.Permisos, "user", 'C');
      //aqui empieza el contenido del controlador
      const [error, createDioceseDto] = CreateDioceseDto.create(req.body);
      if (error) return res.status(400).json({ error });
  
      new CreateDiocese(this.dioceseRepository)
        .execute(createDioceseDto!)
        .then((diocese) =>
          res.json({ msj: "Diocese creada exitosamente", diocese })
        )
        .catch((error) => res.status(400).json({ error }));  
      } catch (error) {
        res.status(400).json("Acces denied");
      }
  };

  public deleteDiocese = (req: Request, res: Response) => {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "user", 'D');
      //aqui empieza el contenido del controlador
      const id = +req.params.id;

      new DeleteDiocese(this.dioceseRepository)
        .execute(id)
        .then((diocese) =>
          res.json({
            msj: "Diocesis " + diocese.name + " eliminada exitosamente!",
            diocese,
          })
        )
        .catch((error) => res.status(400).json({ error })); 
      } catch (error) {
        res.status(400).json("Acces denied");
      }
   
  };
}


