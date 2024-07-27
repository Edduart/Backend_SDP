import { CreateInstruction, InstructionRepository } from "../../domain";
import { Request, Response } from "express";
import { CreateInstructionUseCase } from "../../domain/useCases/instruction";
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
}