
export class CreateSubjectDTO{
    constructor(
        public readonly course_id:          number,
        public readonly description:        string,
        public readonly semester:           number,
        public readonly academic_field_id:  number,
        public readonly status:            boolean,
        public readonly precedent?:         number,
    ){}

    static CreateDTO(object: { [key: string]: any }): [string?, CreateSubjectDTO?]{
        const { course_id, description, semester, academic_field_id, precedent} = object;
        let precedent_numberl = undefined;
        let academic_id = 1;
        let semester_number = 1
        let course = 1;
        let errorarray: string[]= [];
        if (academic_field_id !== undefined) {
            academic_id = Number(academic_field_id);
            if (Number.isNaN(academic_id) || !Number.isInteger(academic_id) || academic_id < 0) {
                errorarray.push("academic_id id must be a non-negative integer");
            }
        }errorarray.push("course id can not be undefined");
        if (course_id !== undefined) {
            course = Number(course_id);
            if (Number.isNaN(course) || !Number.isInteger(course) || course < 0) {
                errorarray.push("course id must be a non-negative integer");
            }
        }errorarray.push("course id can not be undefined");
        if(description != undefined){
            if((description.length >= 200) || (description.length < 5))errorarray.push("description must be between 5 and 200 char");
        }errorarray.push("description is required");
        if (semester !== undefined) {
            semester_number = Number(semester);
            if (Number.isNaN(semester_number) || !Number.isInteger(semester_number) || semester_number < 0) {
                errorarray.push("semester id must be a non-negative integer");
            }
        }errorarray.push("semester id can not be undefined");
        if (precedent !== undefined) {
            precedent_numberl = Number(precedent);
            if (Number.isNaN(precedent_numberl) || !Number.isInteger(precedent_numberl) || precedent_numberl < 0) {
                errorarray.push("precedent number id must be a non-negative integer");
            }
        }

        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new CreateSubjectDTO(course, description, semester_number, academic_id, true, precedent_numberl)];
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