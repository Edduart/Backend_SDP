import { DegreeEntity, ForeingSeminarianEntity, PersonEntity, StageEnum } from "..";
export class SeminarianEntity{
    constructor(
        public id:              string,
        public apostleships:    string | null,
        public location:        Locations_enum,
        public Ministery:       seminarianMinistery_ENUM,
        public stage: StageEnum,
        public status:          seminarian_status_enum,
        public parish_id:       number,
        public diocesi_id:      number,
        public degrees?:        DegreeEntity[],
        public person?:         PersonEntity,
        public foreing_Data?:   ForeingSeminarianEntity,
        public diocesi_name?:   string,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, apostleships, stage,location, Ministery, status, parish_id, diocesi_id} = object;
        return new SeminarianEntity(id, apostleships, location as Locations_enum, Ministery as seminarianMinistery_ENUM,stage as StageEnum, 
            status as seminarian_status_enum, parish_id, diocesi_id);
    }
}

export enum seminarian_status_enum {
    ACTIVO = "ACTIVO",
    RETIRADO = "RETIRADO",
    PASTORAL = "AÑO PASTORAL",
    CULMINADO = "CULMINADO"
}

export enum Locations_enum {
    EXTERNO = "EXTERNO",
    INTERNO = "INTERNO"
}

export enum seminarianMinistery_ENUM {
  UNKOWN = "UNKOWN",
  ADMISI_N = "ADMISION",
  LECTORADO = "LECTORADO",
  ACOLITADO = "ACOLITADO",
}