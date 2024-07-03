export class PhoneEntity{
    constructor(
        public phone_number: string,
        public description: string,
        public person_id?: string,
        public id?: number,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {phone_number, description} = object;
        return new PhoneEntity(phone_number, description)
    }




}