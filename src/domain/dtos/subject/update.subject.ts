export class UpdateSubjectDTO{
    constructor(
        public readonly id :                number,
        public readonly course_id:          number,
        public readonly description:        string,
        public readonly semester:           number,
        public readonly academic_field_id:  number,
        public readonly precedent?:         number,
    ){}

    static CreateDTO(object: { [key: string]: any }): [string?, UpdateSubjectDTO?]{
        let { id, course_id, description, semester, academic_field_id, precedent} = object;
        let bool_homo = false;
        let precedent_numberl = undefined;
        
        let errorarray: string[]= [];

            if (Number.isNaN(academic_field_id) || !Number.isInteger(academic_field_id) || academic_field_id < 0) {
                errorarray.push("academic_id id must be a non-negative integer");
            }
        if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
            errorarray.push("id must be a non-negative integer");
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
        if(id == precedent)errorarray.push("a subject can not precer itselft");
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        description = description.toUpperCase();
        return [undefined, new UpdateSubjectDTO(id, course_id, description, semester, academic_field_id, precedent_numberl)];
    }


}