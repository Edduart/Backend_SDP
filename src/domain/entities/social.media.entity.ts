export class SocialMediaEntity{
    constructor(
        public id: number| null,
        public person_id: string| null,
        public social_Cate: string,
        public link: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {id, person_id, social_Cate, link} = object;
        return new SocialMediaEntity(id, person_id, social_Cate, link)
    }




}