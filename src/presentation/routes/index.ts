import express, { Router } from 'express';
import fs from 'fs';
export class AppRoutes{
  static get routes(): Router{
    const router = express.Router();
    const PATH_ROUTES = __dirname;
    const removeExtension = (fileName: String) => {
      return fileName.split('.').shift();
    };
    
    fs.readdirSync(PATH_ROUTES).filter((file) => {
      const name = removeExtension(file);
      if (name !== 'index' && file !== '__test__') {
        console.log(`ruta actual: ${name}`);
        router.use(`/${name}`, require(`./${file}`));
      }
    });
    return router;
  }
}
