
export class CreateSubjectDTO{
    constructor(
        public readonly course_id:          number,
        public readonly description:        string,
        public readonly semester:           number,
        public readonly academic_field_id:  number,
        public readonly status:            boolean,
        public readonly homologada:        boolean,
        public readonly precedent?:         number,
    ){}

    static CreateDTO(object: { [key: string]: any }): [string?, CreateSubjectDTO?]{
        const { course_id, description, semester, academic_field_id, precedent, homologado} = object;
        let bool_homo = false;
        let precedent_numberl = undefined;
        
        let errorarray: string[]= [];
        if(!Number.isNaN(homologado)){
            const number_aux = Number(homologado);
                switch (number_aux) {
                    case 0:
                        bool_homo = false;
                        break;
                
                    case 1:
                        bool_homo = true;
                        break;
                    default:
                        errorarray.push("homologado can only contain 0 and 1");
                        break;
            }} else {errorarray.push(" homologado must be a number");}

            if (Number.isNaN(academic_field_id) || !Number.isInteger(academic_field_id) || academic_field_id < 0) {
                errorarray.push("academic_id id must be a non-negative integer");
            }
            
        if (Number.isNaN(course_id) || !Number.isInteger(course_id) || course_id < 0) {
           errorarray.push("course id must be a non-negative integer");
        }
        console.log(description + " description: " + (description != undefined))
        if(description != undefined){
            if((description.length >= 200) || (description.length < 5))errorarray.push("description must be between 5 and 200 char");
        } else {errorarray.push("description is required");}
        
        if (Number.isNaN(semester) || !Number.isInteger(semester) || semester < 0) {
            errorarray.push("semester id must be a non-negative integer");
        }

        if (precedent != undefined) {
            precedent_numberl = Number(precedent);
            if (Number.isNaN(precedent_numberl) || !Number.isInteger(precedent_numberl) || precedent_numberl < 0) {
                errorarray.push("precedent number id must be a non-negative integer");
            }
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new CreateSubjectDTO(course_id, description, semester, academic_field_id, true, bool_homo, precedent_numberl)];
    }



    public Validate(): string|null{
        let errorarray: string[]= [];
        if( this.academic_field_id <= 0 ) errorarray.push("course id must be positive");
        if( this.course_id <= 0 ) errorarray.push("course id must be positive");
        if( this.description. length > 200 ) errorarray.push("description is too long");
        if( this.precedent != undefined &&  this. precedent <= 0 ) errorarray.push("precedent must be positive");
        if( this.semester <= 0 ) errorarray.push("semester must be positive");
        
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }


}