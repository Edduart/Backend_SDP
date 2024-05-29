import { Router } from "express";

import { dioceseRoutes } from "./diocese/diocese.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/Dioceses", dioceseRoutes.routes);

    return router;
  }
}
