export class CreateSocialMedia{
    constructor(
        public readonly social_media_category: string,
        public readonly link: string,
    ){}
    
    public Validate(): string|null{
        let errorarray: string[]= [];
        
        if (!this.social_media_category) errorarray.push ("Category is required");
        if (!this.link) errorarray.push ("link is required");

        if (typeof this.social_media_category !== 'string') errorarray.push("category must be a string")
        if (typeof this.link !== 'string') errorarray.push("link only supports characters");

        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }




}