import {
  CreateProfessor,
  CreateProfessorUseCase,
  GetProfessor,
  ProfessorRepository,
  InstructorRepository,
  CreateInstructor,
  CreateInstructorDto,
} from "../../domain";
import { Request, Response } from "express";
import {
  parsePersonData,
  parseUserData,
  parseInstructoData,
} from "../utils/parseData";

export class ProfessorController {
  constructor(
    private readonly repository: ProfessorRepository,
    private readonly instructorPositionRepo: InstructorRepository
  ) {}

  public get = (req: Request, res: Response) => {
    new GetProfessor(this.repository)
      .execute(req.body.id, req.body.status_id)
      .then((professor) => res.json(professor))
      .catch((error) => res.status(400).json({ error }));
  };

  public create = async (req: Request, res: Response) => {
    const isIsntructor = await parseInstructoData(req.body.data);
    console.log(isIsntructor);
    const personData = await parsePersonData(req.body.data, req.body.ayuda);
    const userData = await parseUserData(req.body.data, personData);
    const professorData = new CreateProfessor(userData);
    userData.role = 5;
    const createProfesor = await new CreateProfessorUseCase(this.repository)
      .execute(professorData)
      .then((professor) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Profesor creado correctamente", professor })
      )
      .catch((error) => res.status(400).json({ error }));
    if (isIsntructor != null && createProfesor) {
      const [error, createInstructor] =
        CreateInstructorDto.create(isIsntructor);
      if (error) return res.status(400).json({ error });
      new CreateInstructor(this.instructorPositionRepo).execute(
        createInstructor!
      ).catch((error) => res.status(400).json({ error }));
    }
  };
}
