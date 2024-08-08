
export class SeminarianFichaDTO{
    constructor(
        public readonly id:             string,
        public readonly picture:        string|null,
        public readonly forename:       string,
        public readonly surname:        string,
        public readonly birthdate:      Date,
        public readonly etapa:          string,
        public readonly curso:          string,
        public readonly parish:         string,
        public readonly diocese:        string,
        public readonly cellphone:      string[],
        public readonly redes:          SocialMediaDTO[],
        public readonly location:       string,
        public readonly instruction_grade:string,
        public readonly ministery:      string,
    ){}
}

export class SocialMediaDTO{
    constructor(
        public readonly description: string,
        public readonly link: string,
    ){}
}