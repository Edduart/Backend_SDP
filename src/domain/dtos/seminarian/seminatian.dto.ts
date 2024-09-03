import { ForeingSeminarianEntity, Locations_enum, PersonEntity, seminarian_status_enum, seminarianMinistery_ENUM } from "../..";

export class SeminarianListDTO{
    constructor(
        public id:               string,
        public forename:         string,
        public surname:          string,
        public email:            string,
        public diocesi_name:     string,
        public note?:            string,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, forename, surname, email, diocesi_name, note} = object;
        return new SeminarianListDTO(id, forename, surname, email, diocesi_name, note);
    }
}