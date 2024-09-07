export class SocialMediaEntity{
    constructor(
        public category: string,
        public link: string,
        public id?: number,
        public person_id?: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {category, link, id} = object;
        return new SocialMediaEntity(category, link, id)
    }




}