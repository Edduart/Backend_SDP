import { CreateInstruction, CreateInstructionUseCase, GetInstruction, GetInstructionUseCase, InstructionRepository } from "../../domain";
import { Request, Response } from "express";
export class InstructionController {
    constructor(private readonly repository: InstructionRepository){}
    public create = async (req: Request, res: Response) => {
        const [errores, createinstruction] = CreateInstruction.CreateDTO(req.body);
        if(errores != undefined){
            console.log("verification errors:" + errores);
        res.json({errores});
        }else{
            new CreateInstructionUseCase(this.repository).execute(createinstruction!).then((subject)=>{
                res.json(subject);
            }).catch((error)=>{
                res.status(400).send("unable to create instruction: " + error);
            })
        }
    }
    public get = async (req: Request, res: Response) => {
        const [errores, createinstruction] = GetInstruction.CreateDTO(req.query);
        if(errores != undefined){
            console.log("verification errors:" + errores);
        res.json({errores});
        }else{
            new GetInstructionUseCase(this.repository).execute(createinstruction!).then((subject)=>{
                res.json(subject);
            }).catch((error)=>{
                console.log(error);
                res.status(400).send("unable to get instruction: " + error);
            })
        }
    }
}