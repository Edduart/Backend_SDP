export class AcademicTermEntityt{
    constructor(
        public id:              number,
        public start_date:      Date,
        public end_date:        Date,
        public status:          academic_term_enum,
        public semester:        number,

        public start_strin?:    string,
        public end_string?:     string,
        public name?:           string,
    ){}

    public static fromObject(object: { [key: string]: any }): AcademicTermEntityt {
        const { id, start_date, end_date, status,semester } = object;
        const end_typedate = new Date(end_date);
        const start_typedate = new Date(start_date);
        const name = start_typedate.toISOString().split('-')[0] + '-' + end_typedate.toISOString().split('-')[0]
        return new AcademicTermEntityt(id, start_typedate, end_typedate, status as academic_term_enum, semester, start_typedate.toISOString().split('T')[0], end_typedate.toISOString().split('T')[0], name);
    }
}
export enum academic_term_enum {
    ACTIVO          =   "ACTIVO",
    CULMINADO       =   "CULMINADO",      
    EQUIVALENCIAS   =   "EQUIVALENCIAS"
}