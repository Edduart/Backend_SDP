import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validationResults from "./assests/handler";

export const ValidatorLogin = [
    check('id', "ID requerido")
    .exists()
    .notEmpty()
    .isLength({min: 1, max: 20})
    .isString(),
    check('password', "contraseña requerida")
    .isLength({min: 1, max: 40})
    .isString(),
    (req:Request, res:Response, next:NextFunction) => {
        return validationResults(req, res, next)
    }
]