import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { RoleDataSourceImpl } from "../../infrastructure/datasource/";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorCreateUser, ValidatorEdit } from "../validators/role";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const datasource = new RoleDataSourceImpl();
const Repository = new RoleRepositoryImpl(datasource);
const RoleControl = new RoleController(Repository);

router.post('/', ValidatorTo.ValidarToken, ValidatorCreateUser,RoleControl.createRole);
//mandar el query con la data que se vaya a buscar
router.get("/search/", ValidatorTo.ValidarToken, RoleControl.getRoleMultiple); 
router.delete("/:id", ValidatorTo.ValidarToken, RoleControl.deleteRole);
router.get("/permi/",ValidatorTo.ValidarToken, RoleControl.getAllPermissions);
router.put("/", ValidatorTo.ValidarToken, ValidatorEdit, RoleControl.UpdateRole);
module.exports= router;
