import { SocialMediaDTO } from "../seminarian";

export class instructorFichaDTO{
    constructor(
        public readonly id:             string,
        public readonly picture:        string|null,
        public readonly forename:       string,
        public readonly surname:        string,
        public readonly birthdate:      Date,
        public readonly starting_Date:  Date,
        public readonly posicion:       string,
        public readonly parish:         string,
        public readonly diocese:        string,
        public readonly cellphone:      string[],
        public readonly redes:          SocialMediaDTO[],
        public readonly instruction_grade:string,
    ){}
}