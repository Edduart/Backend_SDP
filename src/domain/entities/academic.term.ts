export class AcademicTermEntityt{
    constructor(
        public id: number,
        public start_date: Date,
        public end_date: Date,
        public status: boolean,
        public start_strin?: string,
        public end_string?: string
    ){}

    public static fromObject(object: { [key: string]: any }): AcademicTermEntityt {
        const { id, start_date, end_date, status } = object;
        const end_typedate = new Date(end_date);
        const start_typedate = new Date(start_date);
        return new AcademicTermEntityt(id, start_typedate, end_typedate, status, start_typedate.toISOString().split('T')[0], end_typedate.toISOString().split('T')[0],);
    }
}