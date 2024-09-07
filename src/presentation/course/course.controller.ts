import { Request, Response } from "express";
import {
  CreateCourseDto,
  CreateCourse,
  GetCourse,
  GetCourses,
  UpdateCourse,
  CourseRepository,
  UpdateCourseDto,
  DeleteCourse,
} from "../../domain";
import { ValidatePermission } from "../services/permissionValidator";

export class CourseController {
  constructor(private readonly courseRepository: CourseRepository) {}

  public getCourses = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "COURSE", "R");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    new GetCourses(this.courseRepository)
      .execute()
      .then((courses) => {
        if(courses.length == 0){
            res.json({msj: "No se a registrado ningun curso"});
        } else {
            res.json(courses);
        }
    }) 
      .catch((error) => res.status(400).json({ error }));
  };

  public getCourseById = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "COURSE", "R");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const id = +req.params.id;
    new GetCourse(this.courseRepository)
      .execute(id)
      .then((course) =>
        res.json({
          mjs: "Curso ID:" + course.id + ", encontrada exitosamente!",
          course,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public updateCourseById = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "COURSE", "U");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const id = +req.params.id;
    const [error, updateCourseDto] = UpdateCourseDto.update({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });
    new UpdateCourse(this.courseRepository)
      .execute(updateCourseDto!)
      .then((course) =>
        res.json({
          msj: "Curso ID:" + course.id + ", actualizada correctamente!",
          course,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public createCourse = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "COURSE", "C");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const [error, createCourseDto] = CreateCourseDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new CreateCourse(this.courseRepository)
      .execute(createCourseDto!)
      .then((course) => res.json({ msj: "Curso creada exitosamente", course }))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteCourse = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "COURSE", "D");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const id = +req.params.id;
    new DeleteCourse(this.courseRepository)
      .execute(id)
      .then((course) =>
        res.json({
          msj: "Curso " + course.description + " eliminada exitosamente!",
          course,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
