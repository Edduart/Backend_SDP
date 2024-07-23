import { Request, Response } from "express";
import { AcademicTermRepository, ActivateAcademicTermUseCase, CreateAcademicTerm, CreateAcademicTermUseCase, EndAcademicTermUseCase, GetAcademicTerm, GetAcademicTermUseCase, PassAcademicTermSemesterUseCase, UpdateAcademicTerm, updateAcademicTermUseCase } from "../../domain";

export class AcademicTermController {
    constructor(private readonly repository: AcademicTermRepository) {}
    public Create = (req: Request, res: Response) => {
        const [error_Arr, academicCreateDTO] = CreateAcademicTerm.create(req.body);
        if (academicCreateDTO != undefined) {
            new CreateAcademicTermUseCase(this.repository).execute(academicCreateDTO)
            .then((academic)=>{res.status(200).json(academic).send();})
            .catch((error) => {res.status(400).json("Error obteniendo periodos" + error).send()})
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
            res.status(400).json("Error obteniendo periodos" + error).send()})
    }

    public Update = (req: Request, res: Response) => {
        const [error_Arr, academicupdateDTO] = UpdateAcademicTerm.create(req.body);
        if (academicupdateDTO != undefined) {
            new updateAcademicTermUseCase(this.repository).execute(academicupdateDTO)
            .then((academic)=>{res.status(200).json(academic).send();})
            .catch((error) => {res.status(400).json("Error actualizando periodos" + error).send()})
        }else{
            console.log(error_Arr);
            res.status(400).json({ error_Arr }).send();
        } 
    }
    public PassSemester = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(id == undefined){res.status(400).json("el id es requerido").send()}
        new PassAcademicTermSemesterUseCase(this.repository).execute(id)
        .then((academic)=>{res.status(200).json(academic).send();})
        .catch((error) => {res.status(400).json("Error actualizando periodos" + error).send()})
    }
    public Activate = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(id == undefined){res.status(400).json("el id es requerido").send()}
        new ActivateAcademicTermUseCase(this.repository).execute(id)
        .then((academic)=>{res.status(200).json(academic).send();})
        .catch((error) => {res.status(400).json("Error actualizando periodos" + error).send()})
    }
    public Deactivate = (req: Request, res: Response) => {
        const id = +req.params.id;
        console.log(id)
        if(id == undefined){res.status(400).json("el id es requerido").send()}
        new EndAcademicTermUseCase(this.repository).execute(id)
        .then((academic)=>{res.status(200).json(academic).send();})
        .catch((error) => {res.status(400).json("Error actualizando periodos" + error).send()})
    }
}