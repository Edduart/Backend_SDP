import { CreateSubjectDTO, CreateSubjectUseCase, SubjectRepository } from "../../domain";
import { Request, Response } from "express";
export class SubjectControler{
    constructor(private readonly repository: SubjectRepository){}


    public Create = async (req: Request, res: Response) => {
        const source = req.headers['Permissions'];
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