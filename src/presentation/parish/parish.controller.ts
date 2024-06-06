import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import {
  DeleteParish,
  GetParish,
  Getparishes,
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
      .then((diocese) =>
        res.json({ msj: "Diocese creada exitosamente", diocese })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getParishes = (req: Request, res: Response) => {
    new Getparishes(this.parishrepository)
      .execute()
      .then((parishrepository) => res.json(parishrepository)) //check parameter
      .catch((error) => res.status(400).json({ error }));
  };

  public GetParishById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetParish(this.parishrepository)
      .execute(id)
      .then((diocese) => res.json(diocese))
      .catch((error) => res.status(400).json({ error }));
  };

  public UpdateParishById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateDioceseDto] = UpdateParishDto.update({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    new UpdateParish(this.parishrepository)
      .execute(updateDioceseDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteParishById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const [error, deleteParishDto] = UpdateParishDto.update({
      ...req.body,
      id,
    });
    new DeleteParish(this.parishrepository)
      .execute(id)
      .then((parish) => res.json(parish))
      .catch((error) => res.status(400).json({ error }));
  };
}
