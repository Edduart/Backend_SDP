export class DocumenDTO{
    constructor(
        public readonly id:             string,
        public readonly forename:       string,
        public readonly surname:        string,
        public period?:        string,
        public stage?:        string,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, forename, surname} = object;
        return new DocumenDTO(id, forename, surname);
    }
}