export class SocialMediaCategoryEntity{
    constructor(
        public id: number,
        public description: string,
        public icon: string,
    ){}
    
    public static fromdb(object: {[key: string]: any}){
        const {id, description, icon} = object;
        return new SocialMediaCategoryEntity(id, description, icon)
    }




}