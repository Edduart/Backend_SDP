import multer, { FileFilterCallback } from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './images/worker')
    },
    filename: function(req, file, cb){
        const filename = 'data.id' +'.' + file.mimetype.split('/')[1];
        cb(null, filename);
        // Set req.body.ayuda to the path of the file
        req.body.ayuda = path.join('./images/worker', filename);
    }
});
const fileFilter = function (req: any, file: Express.Multer.File, cb: FileFilterCallback) {
    // flitro para solo imagenes
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Solo archivos de imagen';
        return cb(null, false);
    }
    cb(null, true);
};

export const guardar = multer({ storage: storage, fileFilter: fileFilter });