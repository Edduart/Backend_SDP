import {
  CreateProfessor,
  CreateProfessorUseCase,
  GetProfessor,
  ProfessorRepository,
  InstructorRepository,
  CreateInstructor,
  CreateInstructorDto,
  DeleteProfessor,
  UpdateProfessorDto,
  UpdateProfessor,
  UpdateInstructorDto,
  UpdateInstructor
} from "../../domain";
import { Request, Response } from "express";
import {
  parsePersonData,
  parseUserData,
  parseInstructoData,
  parseUserDataUpdate,
} from "../utils/parseData";
import fs from "fs";

export class ProfessorController {
  constructor(
    private readonly repository: ProfessorRepository,
    private readonly instructorPositionRepo: InstructorRepository
  ) {}

  public update = async (req: Request, res: Response) => {
    const isInstructor = await parseInstructoData(req.body.data);
    const personData = await parsePersonData(req.body.data, req.body.ayuda);
    const { userData, statusUpdate } = await parseUserDataUpdate(req.body.data);
    //console.log(userData);
    const professorData = new UpdateProfessorDto(
      personData,
      userData,
      statusUpdate
    );
    console.log("instructor data:", isInstructor);
    const updateProfesor = await new UpdateProfessor(this.repository)
      .execute(professorData)
      .then((professor) => {
        if (isInstructor != null) {
          const [error, updateInstructor] =
            UpdateInstructorDto.update(isInstructor);
          if (error) return res.status(400).json({ error });
          new UpdateInstructor(this.instructorPositionRepo).execute(
            updateInstructor!
          );
        }
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Profesor actualizado correctamente", professor });
      })
      .catch((error) => res.status(400).json({ error }));
  };

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
          .send()
      )
      .catch((error) => res.status(400).json({ error }));
    if (isIsntructor != null && createProfesor) {
      const [error, createInstructor] =
        CreateInstructorDto.create(isIsntructor);
      if (error) return res.status(400).json({ error });
      new CreateInstructor(this.instructorPositionRepo)
        .execute(createInstructor!)
        .catch((error) => res.status(400).json({ error })); // this could generate error
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    new DeleteProfessor(this.repository)
      .execute(id)
      .then((Professor) => {
        if (req.body.ayuda != null) {
          fs.unlinkSync(req.body.ayuda);
        }
        res.json({ Professor }).send;
      })
      .catch((error) => {
        res.status(418).send({ error });
      });
  };
}
