

export class ForeingSeminarianEntity{

    constructor(
        public id: string,
        public seminary_name: string,
        public stage: StageEnum,
        public stage_year: number,
    ){}
}

export enum StageEnum{
    PROPEDEUTICO    = "1",
    DISCIPULADO     = "2",
    CONFIGURATIVA   = "3"
}