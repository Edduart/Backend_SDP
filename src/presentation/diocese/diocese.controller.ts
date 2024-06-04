import { Request, Response } from "express";
import {
  CreateDioceseDto,
  CreateDiocese,
  GetDioceses,
  GetDiocese,
  UpdateDiocese,
  DioceseRepository,
  UpdateDioceseDto,
  DeleteDiocese
} from "../../domain";

export class DioceseController {
  constructor(private readonly dioceseRepository: DioceseRepository) {}

  public getDioceses = (req: Request, res: Response) => {
    new GetDioceses(this.dioceseRepository)
      .execute()
      .then((dioceses) => res.json(dioceses)) //check parameter
      .catch((error) => res.status(400).json({ error }));
  };

  public GetDioceseById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetDiocese(this.dioceseRepository)
      .execute(id)
      .then((diocese) => res.json({
        mjs: "Diosesis ID:"+diocese.id+", encontrada exitosamente!",
        diocese}))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateDioceseById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateDioceseDto] = UpdateDioceseDto.update({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    new UpdateDiocese(this.dioceseRepository)
      .execute(updateDioceseDto!)
      .then((diocese) => res.json({msj: "Diocese ID:"+diocese.id+", actualizada correctamente!", diocese }))
      .catch((error) => res.status(400).json({ error }));
  };

  public CreateDiocese = (req: Request, res: Response) => {
    const [error, createDioceseDto] = CreateDioceseDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateDiocese(this.dioceseRepository)
      .execute(createDioceseDto!)
      .then((diocese) => res.json({msj: "Diocese creada exitosamente", diocese}))
      .catch((error) => res.status(400).json({ error }));
  };

  public DeleteDiocese = (req: Request, res: Response) => {
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
  };
}