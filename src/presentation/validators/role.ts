import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import validationResults from "./assests/handler";

export const ValidatorCreateUser = [
    check('name', "el nombre es requerido")
    .exists()
    .notEmpty()
    .isLength({min: 1, max: 100})
    .isString(),
    check('description', "descripcion invalida")
    .isLength({min: 1})
    .isString(),
    check('numbers')
    .isArray(),
    (req:Request, res:Response, next:NextFunction) => {
        return validationResults(req, res, next)
    }
]
export const ValidatorEdit= [
    check('id', "el id es requerido")
    .isInt({gt:1}),
    check('name', "el nombre es requerido")
    .exists()
    .notEmpty()
    .isLength({min: 1, max: 100})
    .isString(),
    check('description', "descripcion invalida")
    .isLength({min: 1})
    .isString(),
    check('numbers')
    .isArray(),
    (req:Request, res:Response, next:NextFunction) => {
        return validationResults(req, res, next)
    }
]