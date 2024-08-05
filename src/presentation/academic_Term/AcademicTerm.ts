import { Request, Response } from "express";
import { AcademicTermRepository, ActivateAcademicTermUseCase, CreateAcademicTerm, CreateAcademicTermUseCase, EndAcademicTermUseCase, GetAcademicTerm, GetAcademicTermUseCase, GetbyidAcademicTermUseCase, PassAcademicTermSemesterUseCase, UpdateAcademicTerm, updateAcademicTermUseCase } from "../../domain";

export class AcademicTermController {
    constructor(private readonly repository: AcademicTermRepository) {}
    public Create = (req: Request, res: Response) => {
        const [error_Arr, academicCreateDTO] = CreateAcademicTerm.create(req.body);
        if (academicCreateDTO != undefined) {
            new CreateAcademicTermUseCase(this.repository).execute(academicCreateDTO)
            .then((academic)=>{ return res.status(200).json(academic);})
            .catch((error) => {
                console.log(error);
                return res.status(400).json("Error creando periodos" + error)})
        }else{
            console.log(error_Arr);
            return res.status(400).json({ error_Arr });
        } 
    }
    public Get = (req: Request, res: Response) => {
        const  get_dto = GetAcademicTerm.create(req.query);
        new GetAcademicTermUseCase(this.repository).execute(get_dto).then((results) => {
            return res.status(200).json(results);
        }).catch((error) => {
            console.log(error);
            return res.status(400).json("Error obteniendo periodos" + error)})
    }
    public Getid = (req: Request, res: Response) => {
        const  get_dto = GetAcademicTerm.create(req.params);
        new GetbyidAcademicTermUseCase(this.repository).execute(get_dto).then((results) => {
            return res.status(200).json(results);
        }).catch((error) => {
            console.log(error);
            return res.status(400).json("Error obteniendo periodos" + error)})
    }
    public Update = (req: Request, res: Response) => {
        const [error_Arr, academicupdateDTO] = UpdateAcademicTerm.create(req.body);
        if (academicupdateDTO != undefined) {
            new updateAcademicTermUseCase(this.repository).execute(academicupdateDTO)
            .then((academic)=>{return res.status(200).json(academic);})
            .catch((error) => {return res.status(400).json("Error actualizando periodos" + error)})
        }else{
            console.log(error_Arr);
            return res.status(400).json({ error_Arr });
        } 
    }
    public PassSemester = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(id == undefined){return res.status(400).json("el id es requerido")}
        new PassAcademicTermSemesterUseCase(this.repository).execute(id)
        .then((academic)=>{return res.status(200).json(academic);})
        .catch((error) => {return res.status(400).json("Error pasando el semestre del periodo" + error)})
    }
    public Activate = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(id == undefined){return res.status(400).json("el id es requerido")}
        new ActivateAcademicTermUseCase(this.repository).execute(id)
        .then((academic)=>{return res.status(200).json(academic);})
        .catch((error) => {return res.status(400).json("Error activando el periodo" + error)})
    }
    public Deactivate = (req: Request, res: Response) => {
        const id = +req.params.id;
        console.log(id)
        if(id == undefined){return res.status(400).json("el id es requerido")}
        new EndAcademicTermUseCase(this.repository).execute(id)
        .then((academic)=>{return res.status(200).json(academic);})
        .catch((error) => {return res.status(400).json("Error eliminando periodo" + error)})
    }
}