export class GetInstruction{
    constructor(
        public subject_id?:      number,
        public academic_term_id?:   number,
        public professor_id?:    string,
      ) {}
    
      static CreateDTO(object: { [key: string]: any }): [string?, GetInstruction?]{
        let errorarray: string[]= [];
        let { subject_id, academic_term_id, professor_id} = object;
        if(subject_id != undefined){
            subject_id = Number(subject_id);
            if (Number.isNaN(subject_id) || !Number.isInteger(subject_id) || subject_id < 0) {
                errorarray.push("subject id must be a non-negative integer");
            }
        }
        if(academic_term_id != undefined){
            academic_term_id = Number(academic_term_id);
            if (Number.isNaN(academic_term_id) || !Number.isInteger(academic_term_id) || academic_term_id < 0) {
                errorarray.push("academic term id must be a non-negative integer");
            }
        }
        if(professor_id != undefined){
            if (!/^(V|E)-\d{1,18}$/.test(professor_id))errorarray.push("professor ID follows this format: V-xxxxxx ");
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetInstruction(subject_id, academic_term_id, professor_id)];
    }
      


}