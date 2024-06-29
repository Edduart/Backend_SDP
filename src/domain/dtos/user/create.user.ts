import { CreateDegree, CreatePerson } from "../..";


export class CreateUserDTO{
    constructor(

        public readonly person: CreatePerson,
        public readonly degree: CreateDegree[]|null,
        public readonly parish_name: string,
        public readonly role: string,
        public password?: string,
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];
        const result_person = this.person.Validate();

        const result_degree = this.degree?.map((degree_actual)=>{
            return degree_actual.Validate();
        })

         //validating it existance
         if (!this.person) errorarray.push("Person is required");
         if (!this.parish_name) errorarray.push ("Parish name is required");
         if (!this.role) errorarray.push("Role is required");
     
          //Validating data types
         if (typeof this.parish_name !== 'string') errorarray.push("Name only supports characters");
         if (typeof this.role !== 'string') errorarray.push("Patron only supports characters");
     
         // Validating Lenght
         if (this.parish_name.length > 100) errorarray.push("Parish name  is too long");
         if (this.parish_name.length < 5 && this.parish_name) errorarray.push("Parish name is too short");
         if(result_degree != null){
            errorarray.push(result_degree.join(", "));
        }
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
