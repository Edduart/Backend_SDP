import {
  HorarioGetUseCase,
  HorarioRepository,
  HorarioUpdateUseCase,
  UpdateHorario,
} from "../../domain";
import { Request, Response } from "express";
export class HorarioController {
  constructor(private readonly horariorepository: HorarioRepository) {}

  public Get = (req: Request, res: Response) => {
    try {
      let id: any = undefined;
      if (req.query.id) {
        id = req.query.id;
        if (id != undefined) id = +id;
      }

      new HorarioGetUseCase(this.horariorepository)
        .execute(id)
        .then((horarios) => res.json(horarios))
        .catch((error) => res.status(400).json({ error }));
    } catch (err) {
      res.status(400).json({ err });
    }
  };
  public Update = (req: Request, res: Response) => {
    try {
      //const result = ValidatePermission(req.body.Permisos, "COURSE", 'U');
      const [error, get_dto] = UpdateHorario.CreateDTO(req.body);
      if (error != undefined) {
        console.log("verification errors:" + error);
        res.json({ error }).send();
      }

      console.log({ get_dto });

      new HorarioUpdateUseCase(this.horariorepository)
        .execute(get_dto!)
        .then((horarios) => res.json(horarios))
        .catch((error) => res.status(400).json({ error }));
    } catch (error) {
      res.status(418).json({ error });
    }
  };
}
