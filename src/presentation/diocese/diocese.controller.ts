import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { 
    GetDioceses,
    GetDiocese,
    UpdateDiocese, 
    DioceseRepository,
    UpdateDioceseDto 
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
      .then((diocese) => res.json(diocese))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateDioceseById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateDioceseDto] = UpdateDioceseDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    new UpdateDiocese(this.dioceseRepository)
      .execute(updateDioceseDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
