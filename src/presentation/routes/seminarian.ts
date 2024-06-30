import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { Request, Response, NextFunction } from 'express';
import { ImageService, profile } from "../services/upload.seminarian";
import { SeminarianDataSourceImpl, SeminarianRepositoryImpl } from "../../infrastructure";
import { SeminarianControler } from "../seminarian/seminarian.controller";

const router = Router();
const datasource = new SeminarianDataSourceImpl();
const Repository = new SeminarianRepositoryImpl(datasource);
const SeminarianControl = new SeminarianControler(Repository);

router.post('/:id', ValidatorTo.ValidarTokenH, (req: Request, res: Response, next: NextFunction) => {
    profile.single('picture')(req, res, (err) => {
        if (err) {
            return next(err);
        }
        SeminarianControl.Create(req, res);
    });
});


//router.post('/', )
module.exports= router;