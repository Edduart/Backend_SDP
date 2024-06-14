import { CreatePhone, CreateWorker, UpdateWorkerUseCase, DeleteWorker, CreateWorkerUseCase, GetWorker, PersonEntity, SocialMedia, WorkerRepository, GetSocials } from "../../domain";
import { Request, Response } from "express";
import fs from 'fs';


export class WorkerControler{
    constructor(private readonly repository: WorkerRepository){}
    public GetSocials = (req: Request, res: Response) => {
      new GetSocials(this.repository)
          .execute()
          .then((worker) => res.json(worker)) //check parameter
          .catch((error) => res.status(400).json({ error }));
  };


    public get = (req: Request, res: Response) => {
        new GetWorker(this.repository)
            .execute(req.body.id, req.body.job)
            .then((worker) => res.json(worker)) //check parameter
            .catch((error) => res.status(400).json({ error }));
    };

    public deleteRole = (req: Request, res: Response) => {
      new DeleteWorker(this.repository)
          .execute(req.params.id)
          .then((worker) => res.json(worker)) //check parameter
          .catch((error) => res.status(400).json({ error }));
    };

    public update = (req: Request, res: Response) =>{
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
  };

    public create = (req: Request, res: Response) =>{
        //el json viene escrito en un string dentro de data asi que aqui lo cambio a json
        let origin = JSON.parse(req.body.data);
        let persona_json = origin.persona;
        let  nuevopath
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
    };


}