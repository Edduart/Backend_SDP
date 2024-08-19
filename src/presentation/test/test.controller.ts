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
GetTestForTestScore
} from "../../domain";

import { ValidatePermission } from "../services/permissionValidator";
import { BuildNotas } from "../docs/Notas.Certificadas";

export class TestController {
  constructor(private readonly repository: TestRepository) {}

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
    const getdto = new GetTestBySubjectDto(
      undefined,
      req.params.id,
      undefined,
      undefined,
      EnrollmentStatus.APROBADO
    );

    new GetTestBySubject(this.repository)
      .execute(getdto)
      .then((test) => {
        const line = res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline; filename=nota.pdf",
        });
        BuildNotas(
          (data) => line.write(data),
          () => line.end(),
          test
        );
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
          .json({ msj: "Enrollment successful", test })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  /*public update = (req: Request, res: Response) => {
    const [error, updateDto] = UpdateEnrollmentDto.update(req.body);
    if (error) return res.status(400).json({ error });
    new UpdateEnrollment(this.repository)
      .execute(updateDto!)
      .then((enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj:
            "Enrollment in subject ID:" + updateDto?.subject_id + ", updated!",
          enrollment,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public delete = (req: Request, res: Response) => {
    const [error, deleteDto] = DeleteEnrollmentDto.delete(req.body);
    if (error) return res.status(400).json({ error });

    new DeleteEnrollment(this.repository)
      .execute(deleteDto!)
      .then((Enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj:
            "Enrollment of subject ID " + Enrollment.subject_id + " disabled!",
          Enrollment,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };*/
}
