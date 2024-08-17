import { Request, Response } from "express";
import {
  GetInstructor,
  GetInstructors,
  InstructorRepository,
  CreateInstructor,
  UpdateInstructor,
  DeleteInstructor,
  CreateInstructorDto,
  UpdateInstructorDto,
  InstructorFichaUseCase,
} from "../../domain";
import { BuildFichaInstructor } from "../docs/ficha.instructor";


export class InstructorController {
  constructor(private readonly instructorRepository: InstructorRepository) {}
  public ficha = (req: Request, res: Response) => {
    new InstructorFichaUseCase(this.instructorRepository).execute(req.params.id).then((seminarians)=>{
      const line =res.writeHead(200,{
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=ficha.pdf"
      })
      BuildFichaInstructor((data)=>line.write(data),()=>line.end(), seminarians); 
    }).catch((error)=>{
        res.status(418).send("unable to create ID: " + error);})
}
  public createInstructor = (req: Request, res: Response) => {
    const [error, createInstructorDto] = CreateInstructorDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new CreateInstructor(this.instructorRepository)
      .execute(createInstructorDto!)
      .then((instructor) =>
        res.json({ msj: "Instructor creado exitosamente", instructor })
      )
      .catch((error) => {
        console.log("unexpected error while executing" + error);
        res.status(400).json({ error });
      });
  };

  public getInstructors = (req: Request, res: Response) => {
    new GetInstructors(this.instructorRepository)
      .execute()
      .then((instructors) => res.json(instructors))
      .catch((error: unknown) => {
        console.log("unexpected error while executing" + error);
        res.status(400).json({ error });
      });
  };

  public getInstructorById = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetInstructor(this.instructorRepository)
      .execute(id)
      .then((instructor) => {

        console.log(instructor);

        res.json({
          mjs:
            "Posicion de instructor ID:" +
            instructor.professor_id +
            ", encontrado exitosamente!",
          instructor,
        });
      })
      .catch((error: unknown) => res.status(400).json({ error }));
  };

  public updateInstructorById = (req: Request, res: Response) => {
    const professor_id = req.params.id;
    const [error, updateInstructorDto] = UpdateInstructorDto.update({
      ...req.body,
      professor_id,
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
      .catch((error) => {
        console.log("unexpected error while executing" + error);
        res.status(400).json({ error });
      });
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
