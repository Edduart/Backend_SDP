export class UpdateHorario {
    private constructor(
      public readonly id: number,
      public readonly Curso: string,
      public readonly link?: string
    ) {} 

    static CreateDTO(object: { [key: string]: any }): [string?, UpdateHorario?]{
        let { id,Curso, link} = object;

        console.log({object})


        /*let errorarray: string[]= [];
        if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
            errorarray.push("ID must be a non-negative integer");
        }
        if(Curso.length = 0 || Curso == undefined){
            errorarray.push("Curso can not be undefined or empty"); 
        }else Curso = Curso.toUpperCase();
        
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }*/
        
        return [undefined, new UpdateHorario(id,Curso, link)];
    }

}