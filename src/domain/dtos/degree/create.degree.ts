
export class CreateDegree{
    constructor(
        public readonly user_id: string,
        public readonly description: string,
        public readonly link: string
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];

        if (!this.description) errorarray.push ("Degree description is required");
        if (!this.link) errorarray.push ("degree link is required");
        if (this.description.length > 200) errorarray.push("Parish name  is too long");

        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }

}