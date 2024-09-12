import { SocialMediaDTO } from "../..";

export class ProfesorFichaDTO{
    constructor(
        public readonly id:             string,
        public readonly picture:        string|null,
        public readonly forename:       string,
        public readonly surname:        string,
        public readonly birthdate:      Date,
        public readonly parish:         string,
        public readonly diocese:        string,
        public readonly cellphone:      string[],
        public readonly redes:          SocialMediaDTO[],
        public readonly instruction_grade:string,
    ){}
}