import { CreateSubjectDTO, CreateSubjectUseCase, DeleteSubjectUseCase, GetSubjectDTO, 
    GetSubjectUseCase, SubjectRepository, UpdateSubjectDTO, 
    UpdateSubjectUseCase} from "../../domain";
import { Request, Response } from "express";
export class SubjectControler{
    constructor(private readonly repository: SubjectRepository){}
    public Delete = async (req: Request, res: Response) => {
        try{
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
    public Get = async (req: Request, res: Response) => {
        try{
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
}