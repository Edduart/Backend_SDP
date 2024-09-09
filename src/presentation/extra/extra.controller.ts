import { prisma } from "../../data/postgres";
import { FilterEnum } from "../utils/filterEnum";
import { Request, Response } from "express";
import { ValidatePermission } from "../services/permissionValidator";
import { BloodType, Job_Psotion_Enum, EnrollmentStatus } from "../../domain";
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
      res.json(Job_Psotion_Enum);
    } catch (error) {
      res.status(400).json("Acces denied");
    }
  }
  public async GetInstructors(req: Request, res: Response) {
    try {
      //la declaracion de variable es para obligar al execute a esperar a que ser ejecute la validacion
      const result = ValidatePermission(req.body.Permisos, "user", "R");
      //aqui empieza el contenido del controlador
      const instructorPositions = await prisma.instructor.findMany({
        where: {
          NOT: { instructor_position: "DESACTIVADO" },
        },
        select: { instructor_position: true },
      });
      console.log({ instructorPositions });
      const filteredInstructorPosition =
        FilterEnum.filterInstructorPosition(instructorPositions);
      res.json(filteredInstructorPosition);
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
