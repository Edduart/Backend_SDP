import { Request, Response } from "express";
import {
  GetStages,
  GetStage,
  StageRepository,
} from "../../domain";

export class StageController {
  constructor(private readonly stageRepository: StageRepository) {}

  public getStages = (req: Request, res: Response) => {
    new GetStages(this.stageRepository)
      .execute()
      .then((stages) => res.json(stages)) 
      .catch((error) => res.status(400).json({ error }));
  };

  public getStageById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetStage(this.stageRepository)
      .execute(id)
      .then((stage) =>
        res.json({
          mjs: "Etapa ID:" + stage.id + ", encontrado exitosamente!",
          stage,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
