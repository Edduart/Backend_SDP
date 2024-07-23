import { academic_term_enum } from "../..";

export class GetAcademicTerm{
    private constructor(
        public readonly status: academic_term_enum,
        public readonly fecha?: Date,
    ){}

    static create(props: { [key: string]: any }): GetAcademicTerm {
        let { fecha, status } = props;
        if(fecha != undefined){
            try {
                fecha = new Date(fecha)
            }catch(error){ 
                console.log("error de fecha" + error);
                fecha = undefined
            }
        }
        if(status != undefined){
            status = status as academic_term_enum
        }else {
            status = academic_term_enum.ACTIVO;
        }
        return new GetAcademicTerm(status, fecha );
    }
}