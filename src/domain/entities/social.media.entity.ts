export class SocialMediaEntity{
    constructor(
        public category: string,
        public link: string,
        public id?: number,
        public social_media_category?: number,
        public person_id?: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {category, link, id, social_media_category} = object;
        return new SocialMediaEntity(category, link, id, social_media_category)
    }




}