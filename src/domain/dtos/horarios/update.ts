export class UpdateHorario {
    private constructor(
      public readonly id: number,
      public readonly link?: string
    ) {} 

    static CreateDTO(object: { [key: string]: any }): [string?, UpdateHorario?]{
        let { id, link} = object;

        console.log({object})


        let errorarray: string[]= [];
        if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
            errorarray.push("ID must be a non-negative integer");
        }
        
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        
        return [undefined, new UpdateHorario(id, link)];
    }

}