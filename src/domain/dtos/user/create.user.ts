import { CreateDegree, CreatePerson } from "../..";


export class CreateUserDTO{
    constructor(

        public readonly person: CreatePerson,
        public readonly degree: CreateDegree[]| undefined,
        public readonly parish_id: number,
        public role: number,
        public password?: string,
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];
        const result_person = this.person.Validate();
        let auxiliary = undefined;
        if(result_person != null)errorarray.push(result_person);

        let result_degree: string[] = [""];
        console.log("los degree son: " + this.degree)
        if(this.degree != undefined && this.degree.length > 0){
            const result_degree = this.degree.map((degree_actual)=>{
                auxiliary = degree_actual.Validate()
                if(auxiliary != null) return auxiliary;
            })
        }
         //validating it existance
         if (!this.person) errorarray.push("Person is required");
         if (!this.role) errorarray.push("Role is required");
     
        result_degree?.forEach(element => {
            if((element != null)) errorarray.push(","+element);
        });
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}
