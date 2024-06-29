export class CreatePhone{
    phone_numbre: any;
    constructor(
        public readonly phone_number: string,
        public readonly description: string
    ){}

    public Validate(): string|null{
        let errorarray: string[]= [];
        if (!this.phone_number) errorarray.push ("Category is required");
        if (!this.description) errorarray.push ("link is required");
        if (!/^\d{1,15}$/.test(this.phone_number))errorarray.push("Cellphone must have only numbers");
        if (typeof this.phone_number !== 'string') errorarray.push("category must be a string")
        if (typeof this.description !== 'string') errorarray.push("link only supports characters");
        
        if (errorarray.length > 0) {
            return errorarray.join(", ");
        }
        return null;
    }
}