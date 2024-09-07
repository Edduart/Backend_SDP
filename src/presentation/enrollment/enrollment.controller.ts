import { Request, Response } from "express";
import {
  CreateEnrollmentDto,
  CreateEnrollment,
  GetEnrollment,
  UpdateEnrollment,
  EnrollmentRepository,
  UpdateEnrollmentDto,
  DeleteEnrollment,
  GetEnrollmentDto,
  GetAcademicStatusDto,
  DeleteEnrollmentDto,
  GetAcademicStatus,
  GetStageOfSeminarianDto,
  getStageOfSeminarian,
  CreateEnrollmentByEquivalenceDto,
  CreateEnrollmentByEquivalence,
  SubjectAllowToEnrollEquivalencyDto,
  GetSubjectAllowToEnrollEquivalency,
  GetAcademicTermByEnrollmentDto,
  GetAcademicTermByEnrollment,
  ContarEnrollsUseCase
} from "../../domain";

import { ValidatePermission } from "../services/permissionValidator";

export class EnrollmentController {
  constructor(private readonly repository: EnrollmentRepository) {}
  public Getcounts = (req: Request, res: Response) => {
    new ContarEnrollsUseCase(this.repository)
      .execute()
      .then((enrollment) =>
        res.json({ enrollment })
      )
      .catch((error) => res.status(400).json({ error }));
  };
  public getAcademicTermByEnrollment = (req: Request, res: Response) => {

    const [error, getDto] = GetAcademicTermByEnrollmentDto.get(req.query);
    if (error)
      return res.status(400).json({ msj: "Data validation errors", error });

    new GetAcademicTermByEnrollment(this.repository)
      .execute(getDto!)
      .then((enrollment) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ enrollment })
      )
      .catch((error) => res.status(400).json({ error }));


  };

  public getSubjectAllowToEnrollEquivalency = (req: Request, res: Response) => {
    const seminarian_id: string = req.params.seminarian_id;

    const [error, createDto] = SubjectAllowToEnrollEquivalencyDto.get({
      seminarian_id,
    });
    if (error)
      return res.status(400).json({ msj: "Data validation errors", error });

    new GetSubjectAllowToEnrollEquivalency(this.repository)
      .execute(createDto!)
      .then((enrollment) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ enrollment })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public createEnrollmentByEquivalence = (req: Request, res: Response) => {
    
    const [error, createDto] = CreateEnrollmentByEquivalenceDto.create(
      req.body
    );
    if (error)
      return res.status(400).json({ msj: "Data validation errors", error });

    new CreateEnrollmentByEquivalence(this.repository)
      .execute(createDto!)
      .then((enrollment) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Enrollment successful", enrollment })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getStageOfSeminarian = (req: Request, res: Response) => {
    const [error, getDto] = GetStageOfSeminarianDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new getStageOfSeminarian(this.repository)
      .execute(getDto!)
      .then((enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getAcademicStatus = (req: Request, res: Response) => {
    console.log("academic status get");

    const seminarian_id: string = req.params.seminarian_id;

    const [error, getDto] = GetAcademicStatusDto.get({ seminarian_id });
    if (error) return res.status(400).json({ error });

    new GetAcademicStatus(this.repository)
      .execute(getDto!)
      .then((enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public get = (req: Request, res: Response) => {
    console.log("general get");

    const [error, getDto] = GetEnrollmentDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new GetEnrollment(this.repository)
      .execute(getDto!)
      .then((enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(enrollment)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public update = (req: Request, res: Response) => {
    const enrollment_id = +req.params.id;

    const [error, updateDto] = UpdateEnrollmentDto.update({
      ...req.body,
      enrollment_id,
    });
    if (error) return res.status(400).json({ error });
    new UpdateEnrollment(this.repository)
      .execute(updateDto!)
      .then((enrollment) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj: "Enrollment in subject updated!",
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
