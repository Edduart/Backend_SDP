import { prisma } from "../../data/postgres"
import {
  permissions as permsData,
  dioceses as diocesesData,
  redes as redData,
  stages as stageData,
  parishes as parishData
} from "./";


// Agregar los datos del seeder aqui 

export const modelData = {
  permission: { model: prisma.permission.createMany, data: permsData },
  diocese: { model: prisma.diocese.createMany, data: diocesesData },
  redes: { model: prisma.social_media_category.createMany, data: redData },
  stage: { model: prisma.stage.createMany, data: stageData },
  parishe: { model: prisma.parish.createMany,data: parishData},
};
