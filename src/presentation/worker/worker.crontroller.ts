import { CreateWorker, UpdateWorkerUseCase, DeleteWorker, CreateWorkerUseCase, GetWorker, 
  WorkerRepository, GetSocials, Job_Psotion_Enum } from "../../domain";
import { Request, Response } from "express";
import fs from 'fs';
import { ValidatePermission } from "../services/permissionValidator";
import { parsePersonData } from "../utils/parseData";


export class WorkerControler{
    constructor(private readonly repository: WorkerRepository){}
    public GetSocials = async (req: Request, res: Response) => {
      try {
        //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "instructor", 'R');

        new GetSocials(this.repository).execute()
        .then((worker) => {
            res.set({'Access-Control-Expose-Headers': 'auth'}).json(worker);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({ error });
        });
    } catch (error) {
      res.status(400).json("Acces denied");
    }
  };


    public get = (req: Request, res: Response) => {
      //si el id es string y mayor a 0 caracteres, y no es numero entonces se manda undefined, si es number tambien se manda el id convertido en numero
      const id = typeof req.query.id === 'string' && req.query.id.length < 20 &&  req.query.id.length > 1? req.query.id : undefined;
      //confirma que la query sea string, este entre 1 y 99 caracteres y retorna el string o undefined
      const job = typeof req.query.job === 'string' && req.query.job.length < 100 &&  req.query.job.length > 1? req.query.job : undefined;
      try {
        //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "instructor", 'R');
        new GetWorker(this.repository)
            .execute(id, job as Job_Psotion_Enum|undefined)
            .then((worker) => res.set({'Access-Control-Expose-Headers': 'auth'}).json(worker)) //check parameter
            .catch((error) => res.status(400).json({ error }));    
      } catch (error) {
      res.status(400).json("Acces denied");
      }
    };

    public deleteRole = (req: Request, res: Response) => {
      try {
        //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "instructor", 'D');
        new DeleteWorker(this.repository)
          .execute(req.params.id)
          .then((worker) => res.set({'Access-Control-Expose-Headers': 'auth'}).json(worker))
          .catch((error) => res.status(400).json({ error }));
    } catch (error) {
      res.status(400).json("Acces denied");
    }
    };

    public update = async (req: Request, res: Response) =>{
      const source = req.headers['Permissions'];
      try {
        //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(source, "instructor", 'U');
      //el json viene escrito en un string dentro de data asi que aqui lo cambio a json
        let origin = JSON.parse(req.body.data);
        const persondto = await parsePersonData(req.body.data, "http://127.0.0.1:3000/"+req.body.ayuda);
        const workerdto = new CreateWorker(persondto, origin.job_position as Job_Psotion_Enum);
        const result_validations = workerdto.Validate();
        if(result_validations == null){
          new UpdateWorkerUseCase(this.repository).execute(workerdto).then((worker)=>{res.json(worker).send})
          .catch((error) => {
              res.status(400).send("Unexpected error: " + error)
          })
      }else{
          //validation errors
          res.status(400).send("Validation error: " + result_validations);
      }
      } catch (error) {
      res.status(401).json("Acces denied");
      }
};

    public create = async (req: Request, res: Response) =>{
      //debido a los comflictos con mutler, todos los permisos seran enviados por header
      const source = req.headers['Permissions'];
        try{
          const result = ValidatePermission(source, "instructor", 'C');
          let origin = JSON.parse(req.body.data);
          const persondto = await parsePersonData(req.body.data, "http://127.0.0.1:3000/"+req.body.ayuda);
          const workerdto = new CreateWorker(persondto, origin.job_position as Job_Psotion_Enum);
          const result_validations = workerdto.Validate();
          if(result_validations == null){
            new CreateWorkerUseCase(this.repository).execute(workerdto).then((worker)=>{res.json(worker).send})
            .catch((error) => {
                res.status(400).send("Unexpected error: " + error)
            })
        }else{
          if (req.body.ayuda != null) {
            fs.unlinkSync(req.body.ayuda);
        }
            //validation errors
            res.status(400).send("Validation error: " + result_validations);
        }
        }catch{
          if (req.body.ayuda != null) {
            fs.unlinkSync(req.body.ayuda);
        }
          res.status(401).json("Acces denied");
        }
    };
}