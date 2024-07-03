

export class ForeingSeminarianEntity{

    constructor(
        public seminary_name: string,
        public stage: StageEnum,
        public stage_year: number,
        public id?: string,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {seminary_name, stage, stage_year} = object;
        
        return new ForeingSeminarianEntity(seminary_name, stage, stage_year);
    }
}

export enum StageEnum{
    PROPEDEUTICO    = "1",
    DISCIPULADO     = "2",
    CONFIGURATIVA   = "3"
}