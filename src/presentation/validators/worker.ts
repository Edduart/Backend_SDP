import { check } from "express-validator";
import validationResults from "./assests/handler";
import { Request, Response, NextFunction } from "express";
export const ValidatorCreateWorker = [
    check('data.persona.id')
    .matches(/^V-\d{15}$/)
    .withMessage("La cedula es requerida"),
    check('data.persona.forename')
    .isLength({min:1, max: 100})
    .withMessage("El nombre es requerido"),
    check('data.persona.surname')
    .isLength({min:1, max: 100})
    .withMessage("El apellido es requerido"),
    check('data.persona.email', )
    .isLength({min:6, max: 200})
    .withMessage("El email es requerido"),
    (req:Request, res:Response, next:NextFunction) => {
        return validationResults(req, res, next)
    }
]