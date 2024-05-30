import { Router } from "express";

import { DioceseRoutes } from "./diocese/diocese.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/Dioceses", DioceseRoutes.routes);

    return router;
  }
}
