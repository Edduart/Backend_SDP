import { CreateForeingSeminarian, DeleteSeminarianUseCase, CreateSeminarian, UpdateSeminarian,
    CreateSeminarianUseCase, Locations_enum, seminarianMinistery_ENUM, SeminarianRepository, 
    StageEnum, UpdateSeminarianUseCase, GetSeminarianDTO, GetSeminarianUseCase,
    seminarian_status_enum,
    GetByIDSeminarianUseCase,
    SeminarianFichaUseCase} from "../../domain";
import { Request, Response } from "express";
import fs from 'fs';
import { parsePersonData, parseUserData } from "../utils/parseData";
import { ValidatePermission } from "../services/permissionValidator";
import { BuildPDF } from "../docs/carta_culminacion";
import { BuildFicha } from "../docs/ficha";
import { BuildConstance } from "../docs/constance";
import { CreateSeminarianList } from "../docs/seminarianlist";
export class SeminarianControler{
    constructor(private readonly repository: SeminarianRepository){}
    public ficha = (req: Request, res: Response) => {
        new SeminarianFichaUseCase(this.repository).execute(req.params.id).then((seminarians)=>{
            const line =res.writeHead(200,{
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=ficha.pdf"
              })
              BuildFicha((data)=>line.write(data),()=>line.end(), seminarians);
        }).catch((error)=>{
            res.status(418).send("unable to create ID: " + error);
        })
    }
    public getCartaCulminacione = async (req: Request, res: Response) => {
        const line =res.writeHead(200,{
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=CartaCulminacion.pdf"
        })
        new GetByIDSeminarianUseCase(this.repository).execute(req.params.id).then((data)=>{
            BuildPDF((data)=>line.write(data),()=>line.end(), data.id, data.surname, data.forename);
        })
    }
    public GetConstance = async (req: Request, res: Response) => {
        new GetByIDSeminarianUseCase(this.repository).execute(req.params.id).then((result)=>{
            const line =res.writeHead(200,{
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=constance.pdf"
            })
            BuildConstance((data)=>line.write(data),()=>line.end(), result.id, result.surname, result.forename, "2023-2024", "Discipulado")
        
        }).catch((error)=>{
            console.log(error);
            res.send(error);
        })
    }
    public get = async (req: Request, res: Response) => {
        try{
            const result = ValidatePermission(req.body.Permisos, "SEMINARIAN", 'R');
            const [error, get_dto] = GetSeminarianDTO.CreateDTO(req.query);
            if(error != undefined){
                console.log("verification errors:" +error);
            res.json({error}).send();
            }else{
                if(get_dto != undefined){
                    new GetSeminarianUseCase(this.repository).execute(get_dto).then((seminarians)=>{
                        res.json(seminarians).send;
                    }).catch((error)=>{
                        res.status(418).send("unable to get seminarians: " + error);
                    })
                }
            }
        }catch(error){
            res.status(418).json({error})
        }
    }
    public delete = async (req: Request, res: Response) => {
        try{
            const result = ValidatePermission(req.body.Permisos, "SEMINARIAN", 'D');
            new DeleteSeminarianUseCase(this.repository).execute(req.params.id).then((result) =>{
                if(typeof result !== 'string'){
                    if (req.body.ayuda != null) {
                        fs.unlinkSync(req.body.ayuda);
                    }
                }
                res.json({message: "seminarian deleted"}).send;
            }).catch((error) => {
                console.log("unexpected error while executing" + error);
                res.status(400).send("Error deleting seminarian: " + error);
            })
        }catch(error){
            console.log("unexpected error while executing");
            res.status(418).send("Error: " + error);
        }
    }

    public update = async (req: Request, res: Response) => {
        const source = req.headers['Permissions'];
        try{
            const result = ValidatePermission(source, "SEMINARIAN", 'U');
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
                user_origin.ministery as seminarianMinistery_ENUM,
                user_origin.status as seminarian_status_enum
            );
            //now check if there are errors
            const errores = seminarian.Validate();
            if(errores == null){
                new UpdateSeminarianUseCase(this.repository).execute(seminarian).then((seminarian)=>{res.json({message: "ready"}).send})
                .catch((error) => {
                    if (req.body.ayuda != null) {
                        fs.unlinkSync(req.body.ayuda);
                      }
                      console.log("unexpected error while executing" + error);
                    res.status(400).send("Unexpected error: " + error)
                })
            }else{
                if (req.body.ayuda != null) {
                    fs.unlinkSync(req.body.ayuda);
                }
                //validation errors
                console.log(errores);
                res.status(400).send("Validation error: " + errores);
            }
        }catch(error){
            // errores de verificacion
            if (req.body.ayuda != null) {
                fs.unlinkSync(req.body.ayuda);
            }
            console.log("unexpected error while executing");
              res.status(418).send("Error: " + error);
        }
    }
    public Create = async (req: Request, res: Response) => {
        const source = req.headers['Permissions'];
        try{
            const result = ValidatePermission(source, "SEMINARIAN", 'C');
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
                new CreateSeminarianUseCase(this.repository).execute(seminarian).then((seminarian)=>{
                    res.json({message: "ready"}).send})
                .catch((error) => {if (req.body.ayuda != null) {fs.unlinkSync(req.body.ayuda);
                      }
                res.status(400).send("Unexpected error: " + error)
                })
            }else{
                if (req.body.ayuda != null) {fs.unlinkSync(req.body.ayuda);}
                //validation errors
                console.log(errores);
                res.status(400).send("Validation error: " + errores);}
        }catch(error){
            // permissions errores
            if (req.body.ayuda != null) {
                fs.unlinkSync(req.body.ayuda);
              }
              console.log("unexpected error while executing");
              console.log("error mientrs se ejecuta");
              res.status(418).send("Error: " + error);
        }
    }
    public CreateList = async (req: Request, res: Response) => {
        try{
            const result = ValidatePermission(req.body.Permisos, "SEMINARIAN", 'R');
            const [error, get_dto] = GetSeminarianDTO.CreateDTO(req.query);
            if(error != undefined){
                console.log("verification errors:" +error);
            res.json({error}).send();
            }else{
                if(get_dto != undefined){
                    new GetSeminarianUseCase(this.repository).execute(get_dto).then((seminarians)=>{
                        const line =res.writeHead(200,{
                            "Content-Type": "application/pdf",
                            "Content-Disposition": "inline; filename=constance.pdf"
                        })
                        CreateSeminarianList((data)=>line.write(data),()=>line.end(), seminarians)   
                    }).catch((error)=>{
                        res.status(418).send("unable to get seminarians: " + error);
                    })
                }
            }
        }catch(error){
            res.status(418).json({error})
        }
    }




}