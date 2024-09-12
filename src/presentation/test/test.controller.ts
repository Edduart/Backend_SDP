import { Request, Response } from "express";
import {
  TestRepository,
  GetTestDto,
  GetTest,
  GetTestBySubjectDto,
  GetTestBySubject,
  CreateTestDto,
  CreateTest,
  EnrollmentStatus,
  GetTestForTestScoreDto,
  GetTestForTestScore,
  UpdateTestDto,
  UpdateTest,
  GetAverageGradeBySubjectDto,
  GetAverageGradeBySubject,
DeleteTest,
GetSeminarianPerNoteUse,
GetSeminarianDTO
} from "../../domain";

import { ValidatePermission } from "../services/permissionValidator";
import { BuildNotas } from "../docs/Notas.Certificadas";
import { CreateSeminarianListWithNotes } from "../docs/seminarialistnote";

export class TestController {
  constructor(private readonly repository: TestRepository) {}

  public getAverageGradeBySubject = (req: Request, res: Response) => {

    console.log("running getAverageGradeBySubject");

    const [error, getDto] = GetAverageGradeBySubjectDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new GetAverageGradeBySubject(this.repository)
      .execute(getDto!)
      .then((gradeAverage) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(gradeAverage)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public delete = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "TEST", "D");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const id = +req.params.id;

    new DeleteTest(this.repository)
      .execute(id!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj: "Test ID " + test.id + " disabled!",
          test,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public update = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "TEST", "U");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const id = +req.params.id;

    const [error, updateDto] = UpdateTestDto.update({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });
    new UpdateTest(this.repository)
      .execute(updateDto!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj: "Test in ID:" + updateDto?.id + ", updated!",
          test,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getTestForTestScore = (req: Request, res: Response) => {
    console.log("get test for subject");

    const [error, getDto] = GetTestForTestScoreDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new GetTestForTestScore(this.repository)
      .execute(getDto!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(test)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public get = (req: Request, res: Response) => {
    console.log("general get");

    const [error, getDto] = GetTestDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new GetTest(this.repository)
      .execute(getDto!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(test)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getTestBySubject = (req: Request, res: Response) => {
    console.log("get by subject");

    const [error, getDto] = GetTestBySubjectDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new GetTestBySubject(this.repository)
      .execute(getDto!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(test)
      )
      .catch((error) => res.status(400).json({ error }));
  };
  public SeminarianListWithNotes = (req: Request, res: Response) => {

    const [error, get_dto] = GetSeminarianDTO.CreateDTO(req.query);
    if(error != undefined){
      console.log("verification errors:" +error);
      res.json({error}).send();
    }else{
      new GetSeminarianPerNoteUse(this.repository).execute(get_dto!).then((seminarians)=>{
        const line =res.writeHead(200,{
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline; filename=constance.pdf"
        })
        CreateSeminarianListWithNotes((data)=>line.write(data),()=>line.end(), seminarians) 
      }).catch((error)=>{
        res.status(418).send("unable to get seminarians: " + error);
      })
    }
    
    
  }
  public notas = (req: Request, res: Response) => {
    const getDto = new GetTestBySubjectDto(
      undefined,
      req.params.id,
      undefined,
      undefined,
      EnrollmentStatus.APROBADO
    );

    new GetTestBySubject(this.repository)
      .execute(getDto)
      .then((test) => {
        console.log(test);
        if (test.length > 0) {
          const line = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=nota.pdf",
          });
          BuildNotas(
            (data) => line.write(data),
            () => line.end(),
            test
          );
        } else {
          res.status(400).json({ error: "Seminarista no encontrado" });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  };
  public create = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "TEST", "C");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const [error, createDto] = CreateTestDto.create(req.body);

    console.log("inside create controller", { createDto });

    if (error)
      return res.status(400).json({ msj: "Data validation errors", error });

    new CreateTest(this.repository)
      .execute(createDto!)
      .then((test) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Test created successfully", test })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
