import { Request, Response } from "express";
import { AcademicTermRepository, CreateAcademicTerm, CreateAcademicTermUseCase, GetAcademicTerm, GetAcademicTermUseCase } from "../../domain";

export class AcademicTermController {
    constructor(private readonly repository: AcademicTermRepository) {}
    public Create = (req: Request, res: Response) => {
        const [error_Arr, academicCreateDTO] = CreateAcademicTerm.create(req.body);
        if (academicCreateDTO != undefined) {
            new CreateAcademicTermUseCase(this.repository).execute(academicCreateDTO)
            .then((academic)=>{res.status(200).json(academic).send();})
            .catch((error) => {res.status(400).json("Error obteniendo perdiosos" + error).send()})
        }else{
            console.log(error_Arr);
            res.status(400).json({ error_Arr }).send();
        } 
    }
    public Get = (req: Request, res: Response) => {
        const  get_dto = GetAcademicTerm.create(req.query);
        new GetAcademicTermUseCase(this.repository).execute(get_dto).then((results) => {
            res.status(200).json(results).send();
        }).catch((error) => {
            console.log(error);
            res.status(400).json("Error obteniendo perdiosos" + error).send()})
    }
}