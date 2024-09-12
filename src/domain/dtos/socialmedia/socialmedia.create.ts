export class CreateSocialMedia{
    constructor(
        public readonly social_media_category: number,
        public readonly link: string,
    ){}
    
    public Validate(): string|null{
        let errorarray: string[]= [];
        if (!this.social_media_category) errorarray.push ("Social media Category ID is required");
        if (!this.link) errorarray.push ("social link is required");

        if (typeof this.link !== 'string') errorarray.push("social link only supports characters");

        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }




}