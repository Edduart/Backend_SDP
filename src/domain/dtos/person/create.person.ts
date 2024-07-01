import { CreatePhone, BloodType, CreateSocialMedia } from "../..";
export class CreatePerson{

    constructor(
        public readonly id: string,
        public profile_picture_path: string|null,
        public readonly forename: string,
        public readonly surname: string,
        public readonly email: string,
        public readonly birthdate: Date,
        public readonly medical_record: string|null,
        public readonly Blood: BloodType,
        public readonly cellphone: CreatePhone[] |null,
        public readonly media: CreateSocialMedia[] |null,
    ){}
    
    public Validate(): string|null{
        let errorarray: string[]= [];
        let auxiliary = undefined;
        const result_cell = this.cellphone?.map((cell_actual)=>{
            auxiliary = cell_actual.Validate()
            if(auxiliary != null) return auxiliary;
        })
        auxiliary = undefined;
        const CreateSocialMedia = this.cellphone?.map((media_actua)=>{
            auxiliary = media_actua.Validate()
            if(auxiliary != null) return auxiliary;
        })
        
        if (!/^\d{1,20}$/.test(this.id))errorarray.push("ID must be only numeric and max 20 digits long");
        if (!(this.Blood in BloodType))errorarray.push("Invalid type of blood");
        if (!this.forename) errorarray.push ("Forename is required");
        if (!this.surname) errorarray.push ("Surname is required");
        if (!this.email) errorarray.push ("email is required");
        if (!this.birthdate) errorarray.push ("Birthdate is required");

        if((this.forename.length < 0) || (this.forename.length >100))errorarray.push("Forename must be between 3 and 100 characters")
        if((this.surname.length < 0) || (this.surname.length >100))errorarray.push("Surname must be between 3 and 100 characters")
        if((this.email.length < 0) || (this.email.length >100))errorarray.push("email must be between 4 and 200 characters")
        const birth_date = new Date(this.birthdate);
        const hoy = new Date();
        const years = hoy.getFullYear() - birth_date.getFullYear();
        if ((years >= 120) || (years <= 16)) {
            errorarray.push("Birthdate invalid")
        }
        result_cell?.forEach(element => {
            if((element != null)) errorarray.push(","+element);
        });
        CreateSocialMedia?.forEach(element => {
            if((element != null)) errorarray.push(","+element);
        });

        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }


}