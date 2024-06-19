import {
  CreatePhone,
  CreateProfessor,
  CreateProfessorUseCase,
  GetProfessor,
  PersonEntity,
  SocialMedia,
  ProfessorRepository,
} from "../../domain";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export class ProfessorController {
  constructor(private readonly repository: ProfessorRepository) {}

  public get = (req: Request, res: Response) => {
    new GetProfessor(this.repository)
      .execute(req.body.id, req.body.status_id)
      .then((professor) => res.json(professor)) 
      .catch((error) => res.status(400).json({ error }));
  };

  public create = (req: Request, res: Response) => {
    //el json viene escrito en un string dentro de data asi que aqui lo cambio a json
    let origin = JSON.parse(req.body.data);
    let persona_json = origin.persona;
    let nuevopath;
    //si es null significa que no se envio ninguna imagen
    if (req.body.ayuda != null) {
      //primero procedo a renombrar el archivo imagen
      const origenpath = req.body.ayuda;
      nuevopath = path.join(
        path.dirname(origenpath),
        persona_json.id + path.extname(origenpath)
      );
      fs.rename(origenpath, nuevopath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      nuevopath = nuevopath.replace(/\\/g, "/");
    } else nuevopath = null;

    //empiezo a separar todos los sub json que necesito y a crear sus respectivas entidades
    const persona = new PersonEntity(
      persona_json.id,
      nuevopath,
      persona_json.forename,
      persona_json.surname,
      persona_json.email,
      new Date(persona_json.birthdate),
      persona_json.medical_record,
      persona_json.BloodType
    );
    const social_json = origin.social;
    const socials: SocialMedia[] = social_json.map(
      (sociales: { social_media_category: number; link: string }) => {
        return new SocialMedia(sociales.social_media_category, sociales.link);
      }
    );
    const phone_json = origin.telefono;
    const telefonos: CreatePhone[] = phone_json.map(
      (celulares: { phone_numbre: string; description: string }) => {
        return new CreatePhone(celulares.phone_numbre, celulares.description);
      }
    );
    //finalmente creo la entidad para crear al trabajador
    const data = new CreateProfessor(
      persona,
      socials,
      telefonos
    );
    new CreateProfessorUseCase(this.repository)
      .execute(data!)
      .then((professor) => res.json(professor).send) 
      .catch((error) => res.status(400).json({ error }));
  };
}
