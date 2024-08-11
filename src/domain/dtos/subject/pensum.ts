export class Stage_PensumDTO{
    constructor(
        public readonly academic_fields:        academic_field_pensumDTo[],
        public readonly name:                   string,
    ){}
}

export class academic_field_pensumDTo{
    constructor(
        public readonly subjects:   string[],
        public readonly name:       string
    ){}
    
}