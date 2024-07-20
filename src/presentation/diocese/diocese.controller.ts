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
    new GetDioceses(this.dioceseRepository)
      .execute()
      .then((dioceses) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(dioceses)
      ) //check parameter
      .catch((error) => res.status(400).json({ error }));
  };

  public getDioceseById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetDiocese(this.dioceseRepository)
      .execute(id)
      .then((diocese) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          mjs: "Diosesis ID:" + diocese.id + ", encontrada exitosamente!",
          diocese,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getDioceseByName = (req: Request, res: Response) => {
    const name = req.params.name.toUpperCase();

    //const result = ValidatePermission(req.body.Permisos, "user", "R");

    new GetDioceseByName(this.dioceseRepository)
      .execute(name)
      .then((diocese) => {
        if (diocese.length == 0) {
          res.json({
            msj: "No se encontro ninguna conincidencia con: " + name,
          });
        } else {
          res.set({ "Access-Control-Expose-Headers": "auth" }).json({
            msj: "coincidencias con la palabra: " + name,
            diocese,
          });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };

  public updateDioceseById = (req: Request, res: Response) => {
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
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj: "Diocese ID:" + diocese.id + ", actualizada correctamente!",
          diocese,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public createDiocese = (req: Request, res: Response) => {
    const [error, createDioceseDto] = CreateDioceseDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateDiocese(this.dioceseRepository)
      .execute(createDioceseDto!)
      .then((diocese) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Diocese creada exitosamente", diocese })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteDiocese = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteDiocese(this.dioceseRepository)
      .execute(id)
      .then((diocese) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj: "Diocesis " + diocese.name + " eliminada exitosamente!",
          diocese,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
