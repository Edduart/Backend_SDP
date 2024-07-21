import { Locations_enum, seminarian_status_enum, seminarianMinistery_ENUM } from "../..";

export class GetSeminarianDTO{
    constructor(
        public readonly id:             string                     | undefined,
        public readonly forename:       string                     | undefined,
        public readonly surname:        string                     | undefined,
        public readonly parish_id:      number                     | undefined,
        public readonly diocese_id:     number                     | undefined,
        public readonly first_Date:     Date                       | undefined,
        public readonly second_Date:    Date                       | undefined,
        public readonly ministery:      seminarianMinistery_ENUM   | undefined,
        public readonly foreing:        boolean                    | undefined,
        public readonly location:       Locations_enum             | undefined,
        public readonly status:         seminarian_status_enum     | undefined,
    ){}
    
    static CreateDTO(object: { [key: string]: any }): [string?, GetSeminarianDTO?]{
        const { id, forename, surname, parish_id, diocese_id, first_Date, second_Date, ministery,foreing,location, status} = object;
        let errorarray: string[]= [];
        //these auxiliaries var are for all the other params that are not strings
        let parish_id_number, diocese_id_number,
        first_Date_obj, second_Date_obj, bool_fore = undefined;
        if(id != undefined){
            if(id.length > 20)errorarray.push("Id is too large");
        }
        if (diocese_id !== undefined) {
            diocese_id_number = Number(id);
            if (Number.isNaN(diocese_id_number) || !Number.isInteger(diocese_id_number) || diocese_id_number < 0) {
                errorarray.push("diocesis id must be a non-negative integer");
            }
        }
        if (parish_id !== undefined) {
            parish_id_number = Number(id);
            if (Number.isNaN(parish_id_number) || !Number.isInteger(parish_id_number) || parish_id_number < 0) {
                errorarray.push("parish id must be a non-negative integer");
            }
        }
        //first step, first_Date and second_Date must be declared or undefined
        if((first_Date != undefined) && (second_Date != undefined)){
            //i use an auxiliary var for lather
            let [first, second] = [false, false];
            //check if first date is a valid that, if so, first aux is true
            if(GetSeminarianDTO.isValidDate(first_Date)){
                first = true;
            }errorarray.push("first is an invalid date format, try 'YYYY-MM-DD'");
            //check if second date is a valid that, if so, second aux is true
            if(GetSeminarianDTO.isValidDate(second_Date)){
                second = true;
            }errorarray.push("second is an invalid date format, try 'YYYY-MM-DD'");
//if both auxiliary are true (so both dates are valids) next i need to check that first date is not greater than second one
            if(first && second){
                first_Date_obj = new Date(first_Date);
                second_Date_obj = new Date(second_Date);
                //check if dates are valid range
                if(first_Date_obj > second_Date_obj)errorarray.push("invalid data range")
            }

        }

        if(ministery != undefined){
            if (!(ministery in seminarianMinistery_ENUM))errorarray.push("Invalid ministery");
        }
        
        if(foreing != undefined){
            if(/^[01]*$/.test(foreing)){
                const number_aux = Number(foreing);
                switch (number_aux) {
                    case 0:
                        bool_fore = false;
                        break;
                
                    case 1:
                        bool_fore = true;
                        break;
                }
            }errorarray.push("This field must contain only '0' or '1' ");

        }
        if(location != undefined){
            if (!(location in Locations_enum))errorarray.push("Invalid location");
        }
        if(status != undefined){
            if (!(status in seminarian_status_enum))errorarray.push("Invalid status");
        }
        if (errorarray.length > 0) {
            return [errorarray.join(", "), undefined];
        }
        return [undefined, new GetSeminarianDTO(id, forename, surname, parish_id_number, diocese_id_number,
            first_Date_obj, second_Date_obj, ministery as seminarianMinistery_ENUM, bool_fore, location as Locations_enum,
            status as seminarian_status_enum)];
    }

    static isValidDate(date: string): boolean {
        const time = Date.parse(date);//try get a times from the string
        /*
        if it returns number, then this function returns true to say that string is a valid date, if its NaN then the function 
        returns false to indicate that string is invalid date
        */
        return !isNaN(time); 
    }

    public GetForeing(){
        if(this.foreing){
            return null
        } return undefined
    }

}