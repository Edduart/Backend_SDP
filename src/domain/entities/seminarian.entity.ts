import { ForeingSeminarianEntity, PersonEntity } from "..";
export class SeminarianEntity{
    constructor(
        public id:              string,
        public apostleships:    string | null,
        public location:        Locations_enum,
        public Ministery:       seminarianMinistery_ENUM,
        public status:          seminarian_status_enum,
        public parish_id:       number,
        public diocesi_id:      number,
        public person?:         PersonEntity,
        public foreing_Data?:   ForeingSeminarianEntity,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, apostleships, location, Ministery, status, parish_id, diocesi_id} = object;
        return new SeminarianEntity(id, apostleships, location as Locations_enum, Ministery as seminarianMinistery_ENUM, 
            status as seminarian_status_enum, parish_id, diocesi_id);
    }
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