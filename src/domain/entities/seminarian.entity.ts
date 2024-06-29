import { User_Entity, ForeingSeminarianEntity } from "..";
export class SeminarianEntity{
    constructor(
        public foreing_Data:    ForeingSeminarianEntity | null,
        public apostleships:    string | null,
        public location: Locations_enum,
        public Ministery:       seminarianMinistery_ENUM,
        public user:            User_Entity,
        public status: seminarian_status_enum
    ){}

}

export enum seminarian_status_enum {
    Activo = "Activo",
    Retirado = "Retirado",
    Pastoral = "Año Pastoral",
    Culminado = "Culminado"
}

export enum Locations_enum {
    Externo = "Externo",
    Interno = "Interno"
}

export enum seminarianMinistery_ENUM {
    Unkown   = "Unkown",
    Admision  = "Admisión",
    Lectorado = "Lectorado",
    Acolitado = "Acolitado"
  }