import { User_Entity, ForeingSeminarianEntity } from "..";
export class SeminarianEntity{
    constructor(
        public foreing_Data:    ForeingSeminarianEntity | null,
        public apostleships:    string | null,
        public location: Locations_enum,
        public Ministery:       seminarianMinistery_ENUM,
        public user:            User_Entity
    ){}

}

export enum Locations_enum {
    Unkown =  "Unkown",
    Admision = "Admisión",
    Lectorado = "Lectorado",
    Acolitado = "Acolitado"
}

export enum seminarianMinistery_ENUM {
    Unkown   = "Unkown",
    Admision  = "Admisión",
    Lectorado = "Lectorado",
    Acolitado = "Acolitado"
  }