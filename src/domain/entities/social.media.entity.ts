export class SocialMediaEntity{
    constructor(
        public social_media_category: number,
        public link: string,
        public id?: number,
        public person_id?: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {social_media_category, link} = object;
        return new SocialMediaEntity(social_media_category, link)
    }




}