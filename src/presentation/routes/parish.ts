import { Router } from "express";
import { ParishController } from "../parish/parish.controller";
import { ParishDatasourceimpl } from "../../infrastructure/datasource/parish.datasource.impl";
import { ParishRepositoryImpl } from "../../infrastructure/repositories/parish.repository.imple";

module.exports =  class DioceseRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ParishDatasourceimpl();
    const dioceseRepository = new ParishRepositoryImpl(datasource);
    const dioceseController = new ParishController(dioceseRepository);

    router.get("/", dioceseController.getDioceses);
    router.get("/:id", dioceseController.GetDioceseById);
    router.put("/:id", dioceseController.updateDioceseById);

    return router;
  }
}

