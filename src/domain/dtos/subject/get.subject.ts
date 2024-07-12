
export class GetSeminarianDTO{
    constructor(
        public readonly description:        string   | undefined,
        public readonly course_id:          number   | undefined,
        public readonly academic_field_id:  number   | undefined,
        public readonly stage_id:           number   | undefined,
    ){}



}