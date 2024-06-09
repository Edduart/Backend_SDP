export class PhoneEntity{
    constructor(
        public id: number| null,
        public phone_number: string,
        public person_id: string| null,
        public description: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {id, phone_number, person_id, description} = object;
        return new PhoneEntity(id, phone_number, person_id, description)
    }




}