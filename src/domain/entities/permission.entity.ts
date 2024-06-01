export class PermissionEntity{
    constructor(
        public id: number, 
        public name: string, 
        public description: string
    ){}

    public static fromdb(object: {[key: string]: any}){
        const {id, name, description} = object;
        return new PermissionEntity( id, name, description)
    }
}