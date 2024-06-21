import { Request, Response } from "express";
import {
  DeleteParish,
  GetParish,
  Getparishes,GetParishByname,
  UpdateParish,
  ParishRepository,
  UpdateParishDto,
  CreateParishDto,
  CreateParish
} from "../../domain";

export class ParishController {
  constructor(private readonly parishrepository: ParishRepository) {}

  public createParish = (req: Request, res: Response) => {
    const [error, createParishDto] = CreateParishDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateParish(this.parishrepository)
      .execute(createParishDto!)
      .then((parish) =>
        res.json({ msj: "Parroquia creada exitosamente", parish })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getParishes = (req: Request, res: Response) => {
    new Getparishes(this.parishrepository)
      .execute()
      .then((parishrepository) => res.json({ msj: "Lista de parroquias existentes: ", parishrepository })) //check parameter
      .catch((error) => res.status(400).json({ error }));
  };

  public GetParishById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetParish(this.parishrepository)
      .execute(id)
      .then((parish) => res.json({ msj: "Parroquia conseguida exitosamente", parish }))
      .catch((error) => res.status(400).json({ error }));
  };

  public getParishByname = (req: Request, res: Response) => {
    const name = req.params.name;

    new GetParishByname(this.parishrepository)
      .execute(name)
      .then((parish) => {
        if (parish.length == 0) {
          res.json({
            msj: "No se encontro ninguna conincidencia con: " + name,
          });
        } else {
          res.json({
            msj: "coincidencias con la palabra: " + name,
            parish,
          });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };

  public UpdateParishById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateParishDto] = UpdateParishDto.update({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    new UpdateParish(this.parishrepository)
      .execute(updateParishDto!)
      .then((parish) => res.json({msj:" Parroquia id:"+id+" actualizada correctamente",parish}))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteParishById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    new DeleteParish(this.parishrepository)
      .execute(id)
      .then((parish) => res.json({msj:" Parroquia"+ id+" eliminada correctamente",parish}))
      .catch((error) => res.status(400).json({ error }));
  };
}
