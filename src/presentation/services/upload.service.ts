import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

const getDestination = (req: Request) => {
  // Use dynamic destination
  const routeName = req.baseUrl; // Get the current route's url
  const route = "./images" + routeName;
  return route;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = getDestination(req);
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const filename = req.params.id + "." + file.mimetype.split("/")[1];
    const filePath = path.join(getDestination(req), filename);
    if (fs.existsSync(filePath)) {
      cb(new Error("File already exist"), "");
    }
    cb(null, filename);
    req.body.ayuda = path.join(getDestination(req), filename);
  },
});
const fileFilter = function (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  //mando un mensaje en caso de que esté vacio
  if (file === undefined) {
    req.body.ayuda = null;
    return cb(null, false);
  }
  // flitro para solo imagenes
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Solo archivos de imagen";
    return cb(null, false);
  }
      const filename = req.params.id + "." + file.mimetype.split("/")[1];
      const filePath = path.join(getDestination(req), filename);
      if (fs.existsSync(filePath)) {
        cb(new Error("I don't have a clue!"));
      }
  cb(null, true);
};
const storageUpdate = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = getDestination(req);
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const filename = req.params.id + "." + file.mimetype.split("/")[1];
    cb(null, filename);
    req.body.ayuda = path.join(getDestination(req), filename);
  },
});

export const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const updateFile = multer({
  storage: storageUpdate,
  fileFilter: fileFilter,
});

export class ImageService {
  public static Service_Guardar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      updateFile.single("file");
      next();
    } catch (error) {
      res.status(400).json("error de imagen");
    }
  }
}
