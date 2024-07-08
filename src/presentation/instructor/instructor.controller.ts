import { Request, Response } from "express";
import {
  GetInstructor,
  GetInstructors,
  InstructorRepository,
  CreateInstructor,
  UpdateInstructor,
  DeleteInstructor,
  CreateInstructorDto,
  UpdateInstructorDto
} from "../../domain";

export class InstructorController {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  public createInstructor = (req: Request, res: Response) => {
    const [error, createInstructorDto] = CreateInstructorDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new CreateInstructor(this.instructorRepository)
      .execute(createInstructorDto!)
      .then((instructor) =>
        res.json({ msj: "Instructor creado exitosamente", instructor })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public getInstructors = (req: Request, res: Response) => {
    new GetInstructors(this.instructorRepository)
      .execute()
      .then((instructors) => res.json(instructors))
      .catch((error: unknown) => res.status(400).json({ error }));
  };

  public getinstructorById = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetInstructor(this.instructorRepository)
      .execute(id)
      .then((instructor) =>
        res.json({
          mjs:
            "Posicion de instructor ID:" +
            instructor.professor_id +
            ", encontrado exitosamente!",
          instructor,
        })
      )
      .catch((error: unknown) => res.status(400).json({ error }));
  };

  public updateInstructorById = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateInstructorDto] = UpdateInstructorDto.update({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });
    new UpdateInstructor(this.instructorRepository)
      .execute(updateInstructorDto!)
      .then((instructor) =>
        res.json({
          msj:
            "Instructor ID:" +
            instructor.professor_id +
            ", actualizada correctamente!",
          instructor,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteInstructor = (req: Request, res: Response) => {
    const id = req.params.id;
    new DeleteInstructor(this.instructorRepository)
      .execute(id)
      .then((instructor) =>
        res.json({
          msj:
            "Instructor " +
            instructor.professor_id +
            " eliminada exitosamente!",
          instructor,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}