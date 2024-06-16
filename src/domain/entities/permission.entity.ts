export class PermissionEntity{
    constructor(
        public id: number, 
        public name: string,
        public type: string, 
        public table: string
    ){}

    public static fromdb(object: {[key: string]: any}){
        const {id, name,type,table} = object;
        return new PermissionEntity( id, name,type,table)
    }
}