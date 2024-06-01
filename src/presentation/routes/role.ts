import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { RoleDataSourceImpl } from "../../infrastructure/datasource/role_datasource_implementation";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role_repositories_implementation";

module.exports = class RoleRoute{
    static get routes(): Router{
        const router = Router();
        const datasource = new RoleDataSourceImpl();
        const dioceseRepository = new RoleRepositoryImpl(datasource);
        const dioceseController = new RoleController(dioceseRepository);

        router.get("/", dioceseController.GetRole);

        return router;
    }




}