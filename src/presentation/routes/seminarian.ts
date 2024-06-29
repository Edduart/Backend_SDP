import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { Request, Response, NextFunction } from 'express';
import { ImageService } from "../services/upload.seminarian";
import { CreatePerson } from "../../domain";

const router = Router();

router.post('/:id', ValidatorTo.ValidarTokenH, ImageService.Service_Guardar);


router.post('/', (req: Request,res: Response)=>{
    res.send();
})
module.exports= router;