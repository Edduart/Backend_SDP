export class SocialMediaEntity{
    social_media_category: any;
    constructor(
        public social_Cate: string,
        public link: string,
        public id?: number,
        public person_id?: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {social_Cate, link} = object;
        return new SocialMediaEntity(social_Cate, link)
    }




}