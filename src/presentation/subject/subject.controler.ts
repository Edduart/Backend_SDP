import { CreateSubjectDTO, CreateSubjectUseCase, DeleteSubjectUseCase, GetFieldstUseCase, GetSubjecInsttUseCase, GetSubjectDTO, 
    GetSubjectUseCase, SubjectRepository, UpdateSubjectDTO, 
    UpdateSubjectUseCase} from "../../domain";
import { Request, Response } from "express";
import { ValidatePermission } from "../services/permissionValidator";
export class SubjectControler{
    constructor(private readonly repository: SubjectRepository){}
    public Delete = async (req: Request, res: Response) => {
        try{
            //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "subject", 'D');
            const number_aux = Number(req.params.id);
            if(Number.isNaN(number_aux)){
                console.log("verification errors: id must be a number");
                res.json("verification errors: id must be a number").send();
            }else{
                new DeleteSubjectUseCase(this.repository).execute(number_aux).then((subject)=>{
                    res.json(subject).send;
                })
                .catch((error)=>{res.status(403).send("unable to get subjects: " + error);})
            }
        }catch(error){
            res.status(401).send("Error: " + error);
        }
    }
    public Get_Field = async (req: Request, res: Response) => {
        try{
            new GetFieldstUseCase(this.repository).execute().then((subjects)=>{res.json(subjects).send;})
                .catch((error)=>{res.status(400).send("unable to get fields: " + error);})
        }catch(error){
            res.status(401).send("Error: " + error);
        }
    }
    public Get = async (req: Request, res: Response) => {
        try{
            //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "subject", 'R');
            const [error, get_dto] = GetSubjectDTO.CreateDTO(req.query);
            if(error != undefined){
                console.log("verification errors:" +error);
                res.json({error}).send();
            }else{
                if(get_dto != undefined){
                    new GetSubjectUseCase(this.repository).execute(get_dto).then((subjects)=>{
                        res.json(subjects).send;
                    })
                    .catch((error)=>{res.status(400).send("unable to get subjects: " + error);})
                }
            }
        }catch(error){
            res.status(401).send("Error: " + error);
        }
    }
    public Update = async (req: Request, res: Response) => {
        try{
            //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "subject", 'U');
            const [error, get_dto] = UpdateSubjectDTO.CreateDTO(req.body);
            if(error != undefined){
                console.log("verification errors:" + error);
            res.json({error}).send();
            }else{
                if(get_dto != undefined){
                    new UpdateSubjectUseCase(this.repository).execute(get_dto).then((subject)=>{
                        res.json(subject).send;
                    }).catch((error)=>{
                        res.status(400).send("unable to create subject: " + error);
                    })
                }
            }
        }catch(error){
            res.status(401).send("Error: " + error);
        }
    }
    public Create = async (req: Request, res: Response) => {
        try{
            //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            const result = ValidatePermission(req.body.Permisos, "subject", 'C');
            const [errores, createsubdto] = CreateSubjectDTO.CreateDTO(req.body);
            if(errores != undefined){
                console.log("verification errors:" + errores);
            res.json({errores}).send();
            }else{
                if(createsubdto != undefined){
                    new CreateSubjectUseCase(this.repository).execute(createsubdto).then((subject)=>{
                        res.json(subject).send;
                    }).catch((error)=>{
                        res.status(400).send("unable to create subject: " + error);
                    })
                }
            }

        }catch(error){
            res.status(401).send("Error: " + error);
        }
    }
    public Get_inst = async (req: Request, res: Response) => {
        try{
            //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
            //const result = ValidatePermission(req.body.Permisos, "subject", 'R');
            const [error, get_dto] = GetSubjectDTO.CreateDTO(req.query);
            if(error != undefined){
                console.log("verification errors:" +error);
                res.json({error}).send();
            }else{
                if(get_dto != undefined){
                    new GetSubjecInsttUseCase(this.repository).execute(get_dto).then((subjects)=>{
                        res.json(subjects).send;
                    })
                    //.catch((error)=>{res.status(400).send("unable to get subjects: " + error);})
                }
            }
        }catch(error){
            //res.status(401).send("Error: " + error);
        }
    }
}