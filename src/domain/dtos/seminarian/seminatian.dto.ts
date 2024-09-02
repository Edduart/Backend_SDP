import { ForeingSeminarianEntity, Locations_enum, PersonEntity, seminarian_status_enum, seminarianMinistery_ENUM } from "../..";

export class SeminarianListDTO{
    constructor(
        public id:              string,
        public apostleships:    string | null,
        public location:        Locations_enum,
        public Ministery:       seminarianMinistery_ENUM,
        public status:          seminarian_status_enum,
        public parish_id:       number,
        public diocesi_id:      number,
        public person?:         PersonEntity,
        public diocesi_name?:   string,
        public note?:            string,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, apostleships, location, Ministery, status, parish_id, diocesi_id} = object;
        return new SeminarianListDTO(id, apostleships, location as Locations_enum, Ministery as seminarianMinistery_ENUM, 
            status as seminarian_status_enum, parish_id, diocesi_id);
    }
}