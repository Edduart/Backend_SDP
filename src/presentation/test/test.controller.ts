import { Request, Response } from "express";
import {
TestRepository,
GetTestDto,
GetTest
} from "../../domain";

import { ValidatePermission } from "../services/permissionValidator";

export class TestController {
  constructor(private readonly repository: TestRepository) {}

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

  public create = (req: Request, res: Response) => {
    const [error, createDto] = CreateEnrollmentDto.create(req.body);
    if (error)
      return res.status(400).json({ msj: "Data validation errors", error });

    new CreateEnrollment(this.repository)
      .execute(createDto!)
      .then((enrollment) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Enrollment successful", enrollment })
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
