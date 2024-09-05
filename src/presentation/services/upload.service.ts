import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const getDestination = (req: Request) => {
  // Use dynamic destination
  const basePath = req.baseUrl; // Get the current route's url
  const imagePath = "./images" + basePath;
  return imagePath;
};
const storage = multer.diskStorage({
  // upload first time
  destination: function (req, file, cb) {
    const destinationFolder = getDestination(req);
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const filename = req.params.id + "." + file.mimetype.split("/")[1];
    cb(null, filename);
    req.body.ayuda = path.join(getDestination(req), filename);
  },
});
const CreateFileFilter = async function (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return cb(new Error("Only valid image files are allowed (JPG, JPEG, PNG)"));
  }
  const filename = req.params.id;
  const constFolderPath = getDestination(req);;
  const files = await fs.promises.readdir(constFolderPath);
  const existingFile = files.find((file) => {
    return file.toLowerCase().startsWith(filename.toLowerCase());
  });
  if (existingFile) {
    return cb(
      new Error(`File with the same name already exists ${existingFile}`)
    );
  }
  cb(null, true);
};
export const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: CreateFileFilter,
});

const UpdateFileFilter = async function (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return cb(new Error("Only valid image files are allowed (JPG, JPEG, PNG)"));
  }
  cb(null, true);
};

export const updateFile = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: UpdateFileFilter,
});
