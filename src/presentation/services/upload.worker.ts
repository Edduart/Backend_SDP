import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './images/worker')
    },
    filename: function(req, file, cb){
        console.log(req.body);
        //let data = JSON.parse(req.body.data);// convierrto esta mangua a string
        cb(null, 'data.id '+'.' + file.mimetype.split('/')[1])
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