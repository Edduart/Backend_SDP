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
import { imageResize } from "../../presentation/utils/imageManipulation";

export class ProfessorController {
  constructor(
    private readonly repository: ProfessorRepository,
    private readonly instructorPositionRepo: InstructorRepository
  ) {}

  public update = async (req: Request, res: Response) => {
    try {
      console.log(req.baseUrl);

      const isInstructor = await parseInstructorData(req.body.data);
      const personData = await parsePersonData(req.body.data, req.body.ayuda);
      const { userData } = await parseUserDataUpdate(req.body.data);

      const professorData = new UpdateProfessorDto(personData, userData);
      const dataValidation = await professorData.DataValidation();

      if (dataValidation) {
        return res.status(400).send("Error: " + dataValidation);
      }

      let newRole = userData.role_id;

      let dtoUpdateInstructor = null;
      if (isInstructor) {
        const [error, updateInstructor] =
          UpdateInstructorDto.update(isInstructor);
        if (error) {
          return res.status(400).json({ error });
        } else {
          newRole = updateInstructor!.instructor_role!;
          dtoUpdateInstructor = updateInstructor;
        }
      }

      await new UpdateProfessor(this.repository)
        .execute(professorData)
        .then(async (professor) => {
          let instructorCreateStatus = {};
          if (isInstructor) {
            instructorCreateStatus = await new UpdateInstructor(
              this.instructorPositionRepo
            )
              .execute(dtoUpdateInstructor!)
              .then(() => {
                return {
                  msj: "Profesor creado e instructor creado correctamente!",
                };
              })
              .catch((error) => {
                return {
                  msj: "Profesor creado, ERROR al crear instructor",
                  error,
                };
              });
          }
          await imageResize(req.body.ayuda);
          res.set({ "Access-Control-Expose-Headers": "auth" }).json({
            msj: "Profesor actualizado correctamente",
            professor,
          });
        })
        .catch((error) => res.status(400).json({ error }));
    } catch (error) {
      res.status(400).json({ error });
    }
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
    try {
      let dtoCreateInstructor = null;
      const isInstructor = await parseInstructorData(req.body.data);
      const personData = await parsePersonData(req.body.data, req.body.ayuda);
      const userData = await parseUserData(req.body.data, personData);
      const professorData = new CreateProfessor(userData);

      userData.role = 4;

      if (isInstructor) {
        const [error, createInstructor] =
          CreateInstructorDto.create(isInstructor);
        if (error) {
          if (fs.existsSync(req.body.ayuda)) fs.unlinkSync(req.body.ayuda);
          return res.status(400).json({ error });
        } else {
          userData.role = createInstructor?.instructor_role!;
          dtoCreateInstructor = createInstructor;
        }
      }

      console.log(req.body.ayuda);

      const dataValidationErrors = professorData.Validate();
      if (dataValidationErrors) {
        if (fs.existsSync(req.body.ayuda)) fs.unlinkSync(req.body.ayuda);
        return res.status(400).send("Error: " + dataValidationErrors);
      }

      await new CreateProfessorUseCase(this.repository)
        .execute(professorData)
        .then(async (professor) => {
          let instructorCreateStatus = {};

          if (isInstructor) {
            instructorCreateStatus = await new CreateInstructor(
              this.instructorPositionRepo
            )
              .execute(dtoCreateInstructor!)
              .then(() => {
                return {
                  msj: "Profesor creado e instructor creado correctamente!",
                };
              })
              .catch((error) => {
                console.error(error);
                return {
                  msj: "Profesor creado, ERROR al crear instructor",
                  error,
                };
              });
          }
          await imageResize(req.body.ayuda);
          res.set({ "Access-Control-Expose-Headers": "auth" }).json({
            msj: "Profesor creado correctamente",
            instructorCreateStatus,
            professor,
          });
        })
        .catch((error) => {
          if (fs.existsSync(req.body.ayuda)) fs.unlinkSync(req.body.ayuda);
          res.status(400).json({ error });
        });
    } catch (error) {
      if (fs.existsSync(req.body.ayuda)) fs.unlinkSync(req.body.ayuda);
      res.status(400).json({ error });
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    new DeleteProfessor(this.repository)
      .execute(id)
      .then((professor) => {
        res.json({ professor });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  };
}
