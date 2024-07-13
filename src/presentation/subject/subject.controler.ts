import { CreateSubjectDTO, CreateSubjectUseCase, GetSubjectDTO, GetSubjectUseCase, SubjectRepository } from "../../domain";
import { Request, Response } from "express";
export class SubjectControler{
    constructor(private readonly repository: SubjectRepository){}
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
                    .catch((error)=>{res.status(418).send("unable to get subjects: " + error);})
                }
            }
        }catch(error){
            res.status(418).send("Error: " + error);
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
                        res.status(418).send("unable to create subject: " + error);
                    })
                }
            }

        }catch(error){
            res.status(418).send("Error: " + error);
        }
    }
}