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
DeleteTest
} from "../../domain";

import { ValidatePermission } from "../services/permissionValidator";
import { BuildNotas } from "../docs/Notas.Certificadas";

export class TestController {
  constructor(private readonly repository: TestRepository) {}

  public delete = (req: Request, res: Response) => {

    const id = +req.params.id;

    new DeleteTest(this.repository)
      .execute(id!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj:
            "Test ID " + test.id + " disabled!",
          test,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public update = (req: Request, res: Response) => {
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
        console.log(test)
        if(test.length >0){
          const line = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline; filename=nota.pdf",
          });
          BuildNotas(
            (data) => line.write(data),
            () => line.end(),
            test
          );
        }else{
          res.status(400).json({error:  "Seminarista no encontrado"});
        }
        
      })
      .catch((error) => res.status(400).json({ error }));
  };
  public create = (req: Request, res: Response) => {
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
