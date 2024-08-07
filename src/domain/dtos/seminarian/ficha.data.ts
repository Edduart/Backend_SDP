import { SocialMediaEntity } from "../..";

export class SeminarianFichaDTO{
    constructor(
        public readonly id:             string,
        public readonly picture:        string,
        public readonly forename:       string,
        public readonly surname:        string,
        public readonly birthdate:      Date,
        public readonly etapa:          string,
        public readonly curso:          string,
        public readonly parish:         string,
        public readonly diocese:        string,
        public readonly cellphone:      string[]                |null,
        public readonly redes:          SocialMediaEntity[]     | null,
        public readonly location:       string,
        public readonly instruction_grade:string,
        public readonly ministery:      string,
    ){}
}