import { HorarioGetUseCase, HorarioRepository, HorarioUpdateUseCase, UpdateHorario } from "../../domain";
import { Request, Response } from "express";
export class HorarioController {
  constructor(private readonly horariorepository: HorarioRepository) {}
  
  public Get = (req: Request, res: Response) => {
    let id = undefined
    try{
      id = Number(req.query.id)
    }catch(error){
      id = undefined
    }
    new HorarioGetUseCase(this.horariorepository).execute(id).then((horarios) => res.json(horarios)) .catch((error) => res.status(400).json({ error }));
  };
  public Update = (req: Request, res: Response) => {
    try{
      //const result = ValidatePermission(req.body.Permisos, "COURSE", 'U');
      const [error, get_dto] = UpdateHorario.CreateDTO(req.query);
      if(error != undefined){
        console.log("verification errors:" +error);
        res.json({error}).send();
      }
      new HorarioUpdateUseCase(this.horariorepository).execute(get_dto!)
      .then((horarios) => 
        res.json(horarios))
      .catch((error) => 
        res.status(400).json({ error }));
    }catch(error){
      res.status(418).json({error})
    }
    
  };

}