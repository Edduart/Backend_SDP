import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { Request, Response, NextFunction } from 'express';
import { profile, profileU } from "../services/upload.seminarian";
import { SeminarianDataSourceImpl, SeminarianRepositoryImpl } from "../../infrastructure";
import { SeminarianControler } from "../seminarian/seminarian.controller";

const router = Router();
const datasource = new SeminarianDataSourceImpl();
const Repository = new SeminarianRepositoryImpl(datasource);
const SeminarianControl = new SeminarianControler(Repository);

router.post('/:id', ValidatorTo.ValidarTokenH,(req: Request, res: Response, next: NextFunction) => {
    profile.single('picture')(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        SeminarianControl.Create(req, res);
    });
});
router.put('/:id', ValidatorTo.ValidarTokenH, (req: Request, res: Response, next: NextFunction)=>{
    profileU.single('picture')(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        SeminarianControl.update(req, res);
    });
});
router.get('/getsem', ValidatorTo.ValidarToken, SeminarianControl.get);
router.delete('/:id', ValidatorTo.ValidarToken, SeminarianControl.delete);
module.exports= router;