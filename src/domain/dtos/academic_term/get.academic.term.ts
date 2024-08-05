import { academic_term_enum } from "../..";

export class GetAcademicTerm{
    private constructor(
        public readonly status: academic_term_enum,
        public readonly fecha?: Date,
        public readonly id?: number,
    ){}

    static create(props: { [key: string]: any }): GetAcademicTerm {
        let { fecha, status,id } = props;
        if (id !== undefined) {
            id = Number(id);
            if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
                id = undefined
            }
        }
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
        return new GetAcademicTerm(status, fecha, id );
    }
}