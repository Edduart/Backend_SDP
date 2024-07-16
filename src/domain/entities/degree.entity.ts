
export class DegreeEntity{
    constructor(
        public id: number,
        public description: string,
        public link: string,
        public user_id?: string,
    ){}
    public static fromdb(object: {[key: string]: any}){
        const {id, description, link, user_id} = object;
        return new DegreeEntity(id, description, link, user_id);
    }
}