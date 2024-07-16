import { PhoneEntity, SocialMediaEntity } from ".";

export class PersonEntity{
    constructor(
        public id:                      string,
        public profile_picture_path:    string|null,
        public forename:                string,
        public surname:                 string,
        public email:                   string,
        public birthdate:               Date,
        public medical_record:          string|null,
        public BloodType:               BloodType,
        public cellpones?:              PhoneEntity[],
        public medias?:                 SocialMediaEntity[],
        public date_String?:            string

    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, profile_picture_path, forename, surname, email, birthdate, medical_record, BloodType} = object;
        let fecha = new Date(birthdate);
        const date_tocreate = fecha.toISOString().split('T')[0];
        const person = new PersonEntity(id, profile_picture_path, forename, surname, email, fecha, medical_record, BloodType);
        person.date_String = date_tocreate;
        return person;
    }
}

export enum BloodType {
    A_POSITIVO  = 'A+',
    A_NEGATIVO  = 'A-',
    B_POSITIVO  = 'B+',
    B_NEGATIVO  = 'B-',
    AB_POSITIVO = 'AB+',
    AB_NEGATIVO = 'AB-',
    O_POSITIVO  = 'O+',
    O_NEGATIVO  = 'O-',
    UNKNOWN     = 'UNKNOWN'
}