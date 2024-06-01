import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { RoleDataSourceImpl } from "../../infrastructure/datasource/role_datasource_implementation";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role_repositories_implementation";


const router = Router();
const datasource = new RoleDataSourceImpl();
const Repository = new RoleRepositoryImpl(datasource);
const RoleControl = new RoleController(Repository);

router.get("/", RoleControl.GetRole);
router.get("/one/:id", RoleControl.getById);
module.exports= router;
