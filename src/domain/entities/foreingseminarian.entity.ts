

export class SeminarianEntity{

    constructor(
        public id: string,
        public seminary_name: string,
        public stage: StageEnum,
        public stage_year: number,
    ){}
}

export enum StageEnum{
   first    = '1',
   second   = '2',
   third    = '3'
}