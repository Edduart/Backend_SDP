export class BitacoraLog{
    constructor(
        public date:      Date,
        public User_id:   string,
        public table:     string,
        public action:    actions_enum,
        public id?:       number,
    ){}

    public static fromObject(object: { [key: string]: any }): BitacoraLog {
        const { ID, date, User_id, table,action } = object;
        const dATE_OBJ = new Date(date);

        return new BitacoraLog(dATE_OBJ, User_id, table, action as actions_enum, ID);
    }
}
export enum actions_enum {
    DELETE          =   "DELETE",
    CREATE          =   "CREATE",      
    UPDATE          =   "UPDATE",
    LOGIN           =   "LOGIN"
}