import { Router } from "express";
import { dioceseController } from "./diocese.controller";
import { dioceseDatasourceImpl } from "../../infrastructure/datasource/diocese.datasource.impl";
import { dioceseRepositoryImpl } from "../../infrastructure/repositories/diocese.repository.imple";

export class dioceseRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new dioceseDatasourceImpl();
    const dioceseRepository = new dioceseRepositoryImpl(datasource);
    const dioceseControllerM = new dioceseController(dioceseRepository);

    router.get("/", dioceseControllerM.getDioceses);
    /*router.get("/:id", todoController.getTodoById);

    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);*/

    return router;
  }
}
