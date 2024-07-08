import { Request, Response } from "express";
import { GetInstructorPositions, GetInstructorPosition, InstructorPositionRepository } from "../../domain";

export class InstructorPositionController {
  constructor(private readonly stageRepository: InstructorPositionRepository) {}

  public getInstructorPositions = (req: Request, res: Response) => {
    new GetInstructorPositions(this.stageRepository)
      .execute()
      .then((instructorPosition) => res.json(instructorPosition))
      .catch((error) => res.status(400).json({ error }));
  };

  public getinstructorPositionById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetInstructorPosition(this.stageRepository)
      .execute(id)
      .then((instructorPosition) =>
        res.json({
          mjs: "Posicion de instructor ID:" + instructorPosition.id + ", encontrado exitosamente!",
          instructorPosition,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
