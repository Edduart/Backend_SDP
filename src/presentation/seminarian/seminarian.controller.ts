import { CreateForeingSeminarian, CreateSeminarian, UpdateSeminarian, CreateSeminarianUseCase, Locations_enum, seminarianMinistery_ENUM, SeminarianRepository, StageEnum, UpdateSeminarianUseCase } from "../../domain";
import { Request, Response } from "express";
import fs from 'fs';
import { parsePersonData, parseUserData } from "../utils/parseData";
import { ValidatePermission } from "../services/permissionValidator";
export class SeminarianControler{
    constructor(private readonly repository: SeminarianRepository){}
    public update = async (req: Request, res: Response) => {
        const source = req.headers['Permissions'];
        try{
            const result = ValidatePermission(source, "seminarian", 'U');
            const data = req.body.data;
            const user_origin = await JSON.parse(data);
            const persondto = await parsePersonData(data, req.body.ayuda);
            let foreingdata = undefined;
            //creating the foreing data
            if(user_origin.ForeingSeminarian != undefined){
                foreingdata = new CreateForeingSeminarian(user_origin.ForeingSeminarian.seminary_name, 
                    user_origin.ForeingSeminarian.stage as StageEnum, 
                    user_origin.ForeingSeminarian.stage_year
                );
            }
            //assembling de seminarian
            const seminarian = new UpdateSeminarian(foreingdata,
                user_origin.location as Locations_enum, user_origin.apostleships, persondto, 
                user_origin.ministery as seminarianMinistery_ENUM
            );
            //now check if there are errors
            const errores = seminarian.Validate();
            if(errores == null){
                new UpdateSeminarianUseCase(this.repository).execute(seminarian).then((seminarian)=>{res.json({message: "ready"}).send})
                .catch((error) => {
                    if (req.body.ayuda != null) {
                        fs.unlinkSync(req.body.ayuda);
                      }
                    res.status(400).send("Unexpected error: " + error)
                })
            }else{
                if (req.body.ayuda != null) {
                    fs.unlinkSync(req.body.ayuda);
                }
                //validation errors
                res.status(400).send("Validation error: " + errores);
            }
        }catch(error){
            // errores de verificacion
            if (req.body.ayuda != null) {
                fs.unlinkSync(req.body.ayuda);
              }
              res.status(418).send("Error: " + error);
        }
    }

    public Create = async (req: Request, res: Response) => {
        const source = req.headers['Permissions'];
        try{
            const result = ValidatePermission(source, "seminarian", 'C');
            const data = req.body.data;
            const user_origin = await JSON.parse(data);
            const persondto = await parsePersonData(data, req.body.ayuda);
            let foreingdata = undefined;
            //creating the foreing data
            if(user_origin.ForeingSeminarian != undefined){
                foreingdata = new CreateForeingSeminarian(user_origin.ForeingSeminarian.seminary_name, 
                    user_origin.ForeingSeminarian.stage as StageEnum, 
                    user_origin.ForeingSeminarian.stage_year
                );
            }
            //creating the user dto
            const user = await parseUserData(req.body.data, persondto);
            //specify the number of the role, 5 by default for seminarians
            user.role = 5;
            //assembling de seminarian
            const seminarian = new CreateSeminarian(foreingdata,
                user_origin.location as Locations_enum, user_origin.apostleships, user, user_origin.ministery as seminarianMinistery_ENUM
            );
            //now check if there are errors
            const errores = seminarian.Validate();
            //if there is any error, it send error
            if(errores == null){
                new CreateSeminarianUseCase(this.repository).execute(seminarian).then((seminarian)=>{res.json({message: "ready"}).send})
                .catch((error) => {
                    if (req.body.ayuda != null) {
                        fs.unlinkSync(req.body.ayuda);
                      }
                    res.status(400).send("Unexpected error: " + error)
                })
            }else{
                if (req.body.ayuda != null) {
                    fs.unlinkSync(req.body.ayuda);
                }
                //validation errors
                res.status(400).send("Validation error: " + errores);
            }
        }catch(error){
            // permissions errores
            if (req.body.ayuda != null) {
                fs.unlinkSync(req.body.ayuda);
              }
              res.status(418).send("Error: " + error);
        }
    }





}