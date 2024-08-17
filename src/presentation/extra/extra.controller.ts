import { BloodType, Job_Psotion_Enum, InstructorPostion, EnrollmentStatus } from "../../domain";
import { ValidatePermission } from "../services/permissionValidator";
import { Request, Response } from "express";

export class ExtraController {
  public Blood(req: Request, res: Response) {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
      const result = ValidatePermission(req.body.Permisos, "user", "R");
      //aqui empieza el contenido del controlador
      res.json(BloodType).send;
    } catch (error) {
      res.status(400).json("Acces denied");
    }
  }

  public Work(req: Request, res: Response) {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
      const result = ValidatePermission(req.body.Permisos, "user", "R");
      //aqui empieza el contenido del controlador
      res.json(Job_Psotion_Enum);
    } catch (error) {
      res.status(400).json("Acces denied");
    }
  }
  public GetInstructors(req: Request, res: Response) {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
      const result = ValidatePermission(req.body.Permisos, "user", "R");
      //aqui empieza el contenido del controlador
      res.json(InstructorPostion);
    } catch (error) {
      res.status(400).json("Acces denied");
    }
  }
  public getEnrollmentStatusEnum(req: Request, res: Response) {
    try {
      const result = ValidatePermission(req.body.Permisos, "user", "R");
      res.json(EnrollmentStatus);
    } catch (error) {
      res.status(400).json("Acces denied");
    }
  }
}