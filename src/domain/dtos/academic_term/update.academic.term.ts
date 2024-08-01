import { academic_term_enum } from "../../entities";


export class UpdateAcademicTerm{
    private constructor(
        public readonly id:         number,
        public readonly start_date: Date,
        public readonly end_date:   Date,
    ){}

    static create(props: { [key: string]: any }): [string?, UpdateAcademicTerm?] {
        let error_array: string[] = [];
        const {  id, start_date, end_date} = props;
        let starting_date = new Date();
        let ending_date = new Date();
        if(id == undefined){
            error_array.push("id es requerido");
        }else{
            if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
                error_array.push("id debe ser un numero, positivo y entero");
             }
        }
        try {starting_date = new Date(start_date)}catch(error){error_array.push("la fecha de inicio es una fecha invalida")}
        try {ending_date = new Date(end_date)}catch(error){error_array.push("la fecha de finalizacion es una fecha invalida")}
        if(ending_date < starting_date)error_array.push("la fecha de finalizacion debe ser mayor a la de inicio")
        let date_dif = starting_date;
        date_dif.setMonth(date_dif.getMonth() + 3);
        if(date_dif > ending_date)error_array.push("el minimo de duracion de un periodo son 3 meses");
        if(error_array.length > 0) return[error_array.join(", "), undefined]
        return [undefined, new UpdateAcademicTerm(id,starting_date, ending_date)];
    }
}