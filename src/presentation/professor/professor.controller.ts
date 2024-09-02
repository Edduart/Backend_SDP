// TODO IMPORTANT; check in all controllers data validation mostly IDs

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
  UpdateInstructor,
  GetProfessorDto,
} from "../../domain";
import { Request, Response } from "express";
import {
  parsePersonData,
  parseUserData,
  parseInstructorData,
  parseUserDataUpdate,
} from "../utils/parseData";
import fs from "fs";
export class ProfessorController {
  constructor(
    private readonly repository: ProfessorRepository,
    private readonly instructorPositionRepo: InstructorRepository
  ) {}

  public update = async (req: Request, res: Response) => {
    const isInstructor = await parseInstructorData(req.body.data);
    const personData = await parsePersonData(
      req.body.data,
      req.body.ayuda
    );

    const { userData } = await parseUserDataUpdate(req.body.data);
    const professorData = new UpdateProfessorDto(personData, userData);

    // TODO validations and remove chainFunction

    const updateProfessor = await new UpdateProfessor(this.repository)
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

  public get = async (req: Request, res: Response) => {
    const [error, getDto] = GetProfessorDto.GetDto(req.query);
    if (error)
      return res.status(400).json({
        msj: "There are some validation errors in the given params!",
        error,
      });
    new GetProfessor(this.repository)
      .execute(getDto!)
      .then((professor) => res.json(professor))
      .catch((error) => res.status(400).json({ error }));
  };

  public create = async (req: Request, res: Response) => {
    // TODO check operations order, check role, validations

    let dtoCreateInstructor = null;
    const isInstructor = await parseInstructorData(req.body.data);
    const personData = await parsePersonData(req.body.data, req.body.ayuda);
    const userData = await parseUserData(req.body.data, personData);
    const professorData = new CreateProfessor(userData);

    userData.role = 4; // TODO add proper roles

    const dataValidationErrors = professorData.Validate();
    if (dataValidationErrors) {
      if (req.body.ayuda != null) {
        fs.unlinkSync(req.body.ayuda);
      }
      return res.status(400).send("Error: " + dataValidationErrors);
    }
    
    if (isInstructor) {
      const [error, createInstructor] =
        CreateInstructorDto.create(isInstructor);
      if (error) {
        if (req.body.ayuda != null) {
          fs.unlinkSync(req.body.ayuda);
        }
        return res.status(400).json({ error });
      } else {
        dtoCreateInstructor = createInstructor;
      }
    }

    const createProfessor = await new CreateProfessorUseCase(this.repository)
      .execute(professorData)
      .then((professor) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Profesor creado correctamente", professor })
          .send()
      )
      .catch((error) => res.status(400).json({ error }));

    console.log({ createProfessor });

    if (isInstructor && createProfessor) {
      new CreateInstructor(this.instructorPositionRepo)
        .execute(dtoCreateInstructor!)
        .catch((error) => res.status(400).json({ error }));
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
