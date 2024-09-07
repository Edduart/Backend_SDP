import { actions_enum } from "../../entities";

export class GetBitDTO {
    private constructor(
        public date1?:      Date,
        public date2?:      Date,
        public User_id?:   string,
        public table?:     string,
        public action?:    actions_enum,
        public id?:       number,
    ) {}
    static GetBitDTO(object: { [key: string]: any }): [string?, GetBitDTO?]{
        let errorarray: string[]= [];
        let { id, date1, date2, User_id, table,action} = object;
        if(User_id != undefined)if (!/^(V|E)-\d{1,18}$/.test(User_id))errorarray.push("person ID follows this format: V-xxxxxx ");

        if(date1 != undefined && date2 != undefined){
            date1 = new Date(date1);
            date2 = new Date(date2);
        }
        if(action != undefined){
            if(!(action in actions_enum))errorarray.push("invalid action type");
        }
        if(id != undefined){
        if (Number.isNaN(id) || !Number.isInteger(id) || id < 0) {
            errorarray.push("ID must be a non-negative integer");
        }}

        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetBitDTO(date1, date2, User_id, table, action, id)];
    }
}