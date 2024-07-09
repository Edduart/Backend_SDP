
export class CreateSubjectDTO{
    constructor(
        public readonly course_id:      number,
        public readonly description:    string,
        public readonly semester:       number,
        public readonly precedent?:     number,
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];

        if( this.course_id < 0 ) errorarray.push("course id must be positive");
        if( this.description. length > 200 ) errorarray.push("description is too long");
        if( this.precedent != undefined &&  this. precedent < 0 ) errorarray.push("precedent must be positive");
        if( this.semester < 0 ) errorarray.push("semester must be positive");
        
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }


}