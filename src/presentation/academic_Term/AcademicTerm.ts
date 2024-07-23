import { Request, Response } from "express";
import { AcademicTermRepository, CreateAcademicTerm, CreateAcademicTermUseCase } from "../../domain";

export class AcademicTermController {
    constructor(private readonly repository: AcademicTermRepository) {}
    public Create = (req: Request, res: Response) => {
        const [error_Arr, academicCreateDTO] = CreateAcademicTerm.create(req.body);
        if (academicCreateDTO != undefined) {
            new CreateAcademicTermUseCase(this.repository).execute(academicCreateDTO).then((academic)=>{res.status(200).json(academic).send();})
        }else{
            console.log(error_Arr);
            res.status(400).json({ error_Arr }).send();
        }
        
    }
}