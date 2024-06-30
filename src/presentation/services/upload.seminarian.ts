import multer, { FileFilterCallback } from "multer";
import path from 'path';
import fs from 'fs';
import { NextFunction, Request, Response } from "express";
const storage_profile_create = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './images/seminarian')
    },
    filename: function(req, file, cb){
        const filename = req.params.id +'.' + file.mimetype.split('/')[1];
        const filePath = path.join('./images/seminarian', filename);
        if (fs.existsSync(filePath)) {
            return cb(new Error('File already exists'), '');
        }
        cb(null, filename);
        req.body.ayuda = path.join('./images/seminarian', filename);
    }
});
const fileFilter = function (req: any, file: Express.Multer.File, cb: FileFilterCallback) {
    //mando un mensaje en caso de que esté vacio
    if (file === undefined) {
        req.body.ayuda = null;
        return cb(null, false);
    }
    // flitro para solo imagenes
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Solo archivos de imagen';
        return cb(null, false);
    }
    cb(null, true);
};
export const profile = multer({ storage: storage_profile_create, fileFilter: fileFilter });
export class ImageService{
    public static Service_Guardar(req: Request, res: Response, next: NextFunction){
        try{
            profile.single('picture')(req, res, next);
            next();
        }catch(error){res.status(400).json("error de imagen");}
    }
}