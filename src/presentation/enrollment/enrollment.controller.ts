import { Request, Response } from "express";
import {
  CreateEnrollmentDto,
  CreateEnrollment,
  GetEnrollment,
  UpdateEnrollment,
  EnrollmentRepository,
  UpdateEnrollmentDto,
  DeleteEnrollment,
} from "../../domain";
import { ValidatePermission } from "../services/permissionValidator";

export class EnrollmentController {
  constructor(private readonly repository: EnrollmentRepository) {}

  public get = (req: Request, res: Response) => {
    new GetEnrollment(this.repository)
      .execute()
      .then((enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public update = (req: Request, res: Response) => {
    const subject_id = +req.params.id;
    const [error, updateDto] = UpdateEnrollmentDto.update({
      ...req.body,
      subject_id,
    });
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
    if (error) return res.status(400).json({ error });

    new CreateEnrollment(this.repository)
      .execute(createDto!)
      .then((enrollment) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Enrollment created", enrollment })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public delete = (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeleteEnrollment(this.repository)
      .execute(id)
      .then((Enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj:
            "Enrollment of subject ID " + Enrollment.subject_id + " disabled!",
          Enrollment,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
