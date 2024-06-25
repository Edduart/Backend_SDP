import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { Request, Response, NextFunction } from 'express';
import { ImageService } from "../services/upload.seminarian";

const router = Router();

router.post('/:id', ValidatorTo.ValidarTokenH, ImageService.Service_Guardar);
module.exports= router;