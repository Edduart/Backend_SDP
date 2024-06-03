import { Router } from "express";
import { DioceseController } from "../diocese/diocese.controller";
import { DioceseDatasourceImpl } from "../../infrastructure/datasource/diocese.datasource.impl";
import { DioceseRepositoryImpl } from "../../infrastructure/repositories/diocese.repository.imple";

const router = Router();
const datasource = new DioceseDatasourceImpl();
const dioceseRepository = new DioceseRepositoryImpl(datasource);
const dioceseController = new DioceseController(dioceseRepository);

//router.post("/", dioceseController.create);
router.get("/", dioceseController.getDioceses);
router.get("/:id", dioceseController.GetDioceseById);
router.put("/:id", dioceseController.updateDioceseById);
module.exports = router;

/*module.exports = class DioceseRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new DioceseDatasourceImpl();
    const dioceseRepository = new DioceseRepositoryImpl(datasource);
    const dioceseController = new DioceseController(dioceseRepository);

    router.get("/", dioceseController.getDioceses);
    router.get("/:id", dioceseController.GetDioceseById);
    router.put("/:id", dioceseController.updateDioceseById);

    return router;
  }
};*/
