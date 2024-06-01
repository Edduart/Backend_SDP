import { Router } from "express";
import { DioceseController } from "../diocese/diocese.controller";
import { DioceseDatasourceImpl } from "../../infrastructure/datasource/diocese.datasource.impl";
import { DioceseRepositoryImpl } from "../../infrastructure/repositories/diocese.repository.imple";

module.exports =  class DioceseRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new DioceseDatasourceImpl();
    const dioceseRepository = new DioceseRepositoryImpl(datasource);
    const dioceseController = new DioceseController(dioceseRepository);

    router.get("/", dioceseController.getDioceses);
    /*router.get("/:id", todoController.getTodoById);

    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);*/

    return router;
  }
}


