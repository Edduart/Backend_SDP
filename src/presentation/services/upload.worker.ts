import multer, { FileFilterCallback } from "multer";
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './images/worker')
    },
    filename: function(req, file, cb){
        console.log(req.params.id);
        const filename = req.params.id +'.' + file.mimetype.split('/')[1];
        const filePath = path.join('./images/worker', filename);
        if (fs.existsSync(filePath)) {
            return cb(new Error('File already exists'), '');
        }
        cb(null, filename);
        req.body.ayuda = path.join('./images/worker', filename);
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

export const guardar = multer({ storage: storage, fileFilter: fileFilter });