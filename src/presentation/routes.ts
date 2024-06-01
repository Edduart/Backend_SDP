/*
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
        console.log(`/${name}/${name}.routes`);
        router.use(`/${name}`, require(`./${file}/${name}.routes`));
      }
    });
    return router;
  }
}
*/


import { Router } from "express";
import { RoleRoute } from "./role/role.routes";
import { DioceseRoutes } from "./diocese/diocese.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/Dioceses", DioceseRoutes.routes);
    router.use("/api/Role", RoleRoute.routes);
    console.log('Running');
    return router;
  }
}
