export class SocialMediaEntity{
    constructor(
        public category: number,
        public link: string,
        public id?: number,
        public person_id?: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {social_media_category, link, id} = object;
        return new SocialMediaEntity(social_media_category, link, id)
    }




}