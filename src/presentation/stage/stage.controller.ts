import { Request, Response } from "express";
import {
  CreateStageDto,
  CreateStage,
  GetStages,
  GetStage,
  UpdateStage,
  StageRepository,
  UpdateStageDto,
  DeleteStage,
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

  public updateStageById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateStageDto] = UpdateStageDto.update({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    new UpdateStage(this.stageRepository)
      .execute(updateStageDto!)
      .then((stage) =>
        res.json({
          msj: "Etapa ID:" + stage.id + ", actualizada correctamente!",
          stage,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public createStage = (req: Request, res: Response) => {
    const [error, createStageDto] = CreateStageDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateStage(this.stageRepository)
      .execute(createStageDto!)
      .then((stage) =>
        res.json({ msj: "Etapa creada exitosamente", stage })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteStageById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteStage(this.stageRepository)
      .execute(id)
      .then((stage) =>
        res.json({
          msj: "Etapa " + stage.description + " eliminada exitosamente!",
          stage,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
