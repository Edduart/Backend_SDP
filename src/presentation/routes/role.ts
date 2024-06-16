import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { RoleDataSourceImpl } from "../../infrastructure/datasource/";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorCreateUser, ValidatorEdit } from "../validators/role";

const router = Router();
const datasource = new RoleDataSourceImpl();
const Repository = new RoleRepositoryImpl(datasource);
const RoleControl = new RoleController(Repository);

router.post('/', ValidatorCreateUser,RoleControl.createRole);
//mandar el query con la data que se vaya a buscar
router.get("/search/", RoleControl.getRoleMultiple); 
router.delete("/:id", RoleControl.deleteRole);
router.get("/permi/",RoleControl.getAllPermissions);
router.put("/", ValidatorEdit, RoleControl.UpdateRole);
module.exports= router;
