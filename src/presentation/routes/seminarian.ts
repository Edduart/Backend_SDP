import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { Request, Response, NextFunction } from 'express';
import { ImageService } from "../services/upload.seminarian";
import { CreatePerson } from "../../domain";
import { parsePersonData } from "../utils/parseData";

const router = Router();

router.post('/:id', ValidatorTo.ValidarTokenH, ImageService.Service_Guardar);


router.post('/', async (req: Request,res: Response)=>{
    const person = await parsePersonData(req);
    const result = (person).person.Validate();
    console.log(result)
    res.send();
})
module.exports= router;