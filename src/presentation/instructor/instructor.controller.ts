import { Request, Response } from "express";
import {
  GetInstructor,
  GetInstructors,
  InstructorRepository,
} from "../../domain";

export class InstructorController {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  public getInstructors = (req: Request, res: Response) => {
    new GetInstructors(this.instructorRepository)
      .execute()
      .then((instructors) => res.json(instructors))
      .catch((error : unknown) => res.status(400).json({ error }));
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
}
