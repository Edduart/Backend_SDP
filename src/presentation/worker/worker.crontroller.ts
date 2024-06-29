import { CreatePhone, CreateWorker, UpdateWorkerUseCase, DeleteWorker, CreateWorkerUseCase, GetWorker, PersonEntity, WorkerRepository, GetSocials, Job_Psotion_Enum, PermissionEntity } from "../../domain";
import { Request, Response } from "express";
import fs from 'fs';
import { ValidatePermission } from "../services/permissionValidator";


export class WorkerControler{
    constructor(private readonly repository: WorkerRepository){}
    public GetSocials = async (req: Request, res: Response) => {
      try {
        //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(req.body.Permisos, "instructor", 'R');

        new GetSocials(this.repository).execute()
        .then((worker) => {
            res.json(worker);
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
            .then((worker) => res.json(worker)) //check parameter
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
          .then((worker) => res.json(worker))
          .catch((error) => res.status(400).json({ error }));
    } catch (error) {
      res.status(400).json("Acces denied");
    }
    };

    public update = (req: Request, res: Response) =>{
      /*
      const source = req.headers['Permissions'];
      try {
        //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
        const result = ValidatePermission(source, "instructor", 'U');
      //el json viene escrito en un string dentro de data asi que aqui lo cambio a json
        let origin = JSON.parse(req.body.data);
        let persona_json = origin.persona;
        let  nuevopath;
      //si es null significa que no se envio imagenes
        if(req.body.ayuda != null){
            nuevopath = req.body.ayuda.replace(/\\/g, "/");
        }else nuevopath = null;
        
        //empiezo a separar todos los sub json que necesito y a crear sus respectivas entidades
        
        const persona = new PersonEntity(persona_json.id, nuevopath, persona_json.forename, persona_json.surname, persona_json.email, new Date(persona_json.birthdate),persona_json.medical_record, persona_json.BloodType);
      
        const social_json = origin.social;
        const socials: SocialMedia[] = social_json.map( (sociales: { social_media_category: number; link: string; }) => {
            return new SocialMedia(sociales.social_media_category, sociales.link);
        });
        const phone_json = origin.telefono;
        const telefonos: CreatePhone[] = phone_json.map((celulares: { phone_numbre: string; description: string; }) => {
            return new CreatePhone(celulares.phone_numbre, celulares.description);
        });
        //finalmente creo la entidad para crear al trabajador
        const data = new CreateWorker(persona, origin.job_position, socials, telefonos);
        data.validate()
          .then(() => {
             // si pasa el validador se prosigue
          new UpdateWorkerUseCase(this.repository)
            .execute(data)
            .then((worker) => {
              console.log("Etapa 2");
              res.json(worker);
            })
            .catch((error) => {
              // errores de proceso
              if (nuevopath != null) {
                  fs.unlinkSync(nuevopath);
                }
                res.status(400).json({ error });
            });
          })
      .catch((error) => {
  // errores de verificacion
    if (nuevopath != null) {
      fs.unlinkSync(nuevopath);
    }
    res.status(418).send("Error de validaciones " + error);
    });
      } catch (error) {
      res.status(400).json("Acces denied");
      }
      */  
};

    public create = (req: Request, res: Response) =>{
      /*
      //debido a los comflictos con mutler, todos los permisos seran enviados por header
      const source = req.headers['Permissions'];
        try{
          const result = ValidatePermission(source, "instructor", 'C');
          //el json viene escrito en un string dentro de data asi que aqui lo cambio a json
          let origin = JSON.parse(req.body.data);
          let persona_json = origin.persona;
          let  nuevopath;
          //si es null significa que no se envio imagenes
          if(req.body.ayuda != null){
            nuevopath = req.body.ayuda.replace(/\\/g, "/");
          }else nuevopath = null;


          //empiezo a separar todos los sub json que necesito y a crear sus respectivas entidades
          const persona = new PersonEntity(persona_json.id,'localhost:3000/' + nuevopath, persona_json.forename, persona_json.surname, persona_json.email, new Date(persona_json.birthdate),persona_json.medical_record, persona_json.BloodType);
       
          const social_json = origin.social;
          const socials: SocialMedia[] = social_json.map( (sociales: { social_media_category: number; link: string; }) => {
              return new SocialMedia(sociales.social_media_category, sociales.link);
          });
          const phone_json = origin.telefono;
          const telefonos: CreatePhone[] = phone_json.map((celulares: { phone_numbre: string; description: string; }) => {
              return new CreatePhone(celulares.phone_numbre, celulares.description);
          });
          //finalmente creo la entidad para crear al trabajador
          const data = new CreateWorker(persona, origin.job_position, socials, telefonos);
          data.validate()
          .then(() => {
            // si pasa el validador se prosigue
              new CreateWorkerUseCase(this.repository)
              .execute(data)
                .then((worker) => {
                res.json(worker);
                })
            .catch((error) => {
            // errores de proceso
              if (nuevopath != null) {
                fs.unlinkSync(nuevopath);
              }
              res.status(400).json({ error });
            });
          })
          .catch((error) => {
            // errores de verificacion
            if (nuevopath != null) {
                fs.unlinkSync(nuevopath);
              }
              res.status(418).send("Error de validaciones " + error);
          });
        }catch{
          res.status(400).json("Acces denied");
        }
        */
    };
}