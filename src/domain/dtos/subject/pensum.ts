export class Stage_PensumDTO{
    constructor(
        public readonly subjects:               subjectPensumDTO[],
        public readonly name:                   string,
    ){}
}

export class subjectPensumDTO{
    constructor(
        public readonly preceden:   string,
        public readonly name:       string
    ){}
    
}