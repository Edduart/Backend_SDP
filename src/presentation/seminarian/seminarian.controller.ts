import { CreateForeingSeminarian, CreateSeminarian, Locations_enum, seminarian_status_enum, seminarianMinistery_ENUM, SeminarianRepository, StageEnum } from "../../domain";
import { ValidatePermission } from "../services/permissionValidator";
import { Request, Response } from "express";
import { parsePersonData, parseUserData } from "../utils/parseData";
export class SeminarianControler{
    constructor(private readonly repository: SeminarianRepository){}
    public Create = async (req: Request, res: Response) => {
        try{
            //const result = ValidatePermission(req.body.Permisos, "seminarian", 'C');
            const data_p = await req.body.data.persona;
            console.log(data_p);
            const persondto = await parsePersonData(data_p);
            let foreingdata = undefined;
            if(req.body.data.ForeingSeminarian != undefined){
                foreingdata = new CreateForeingSeminarian(req.body.data.ForeingSeminarian.seminary_name, 
                    req.body.data.ForeingSeminarian.stage as StageEnum, 
                    req.body.data.ForeingSeminarian.stage_year
                );
            }
            const user = await parseUserData(req.body.data.user, persondto);
            const seminarian = new CreateSeminarian(foreingdata,
                req.body.data.location as Locations_enum, req.body.data.apostleships, user, req.body.data.ministery as seminarianMinistery_ENUM
            );
            const errores = seminarian.Validate();
            console.log(errores);
        }catch(error){
            console.log(error);
        }
    }





}