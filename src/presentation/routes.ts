import { Router } from "express";

import { dioceseRoutes } from "./diocese/routes.diocese";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/Dioceses", dioceseRoutes.routes);

    return router;
  }
}
