export class PersonEntity{
    constructor(
        public id: string,
        public profile_picture_path: string|null,
        public forename: string,
        public surname: string,
        public email: string,
        public birthdate: Date,
        public medical_record: string,
        public BloodType: string

    ){}


    public static fromdb(object: {[key: string]: any}){
        const {id, profile_picture_path, forename, surname, email, birthdate, medical_record, BloodType} = object;
        let fecha = new Date()
        if(birthdate instanceof Date){
            fecha = new Date(birthdate);
        }else{
            console.log(birthdate);
        }
        
        return new PersonEntity(id, profile_picture_path, forename, surname, email, fecha, medical_record, BloodType)
    }
}