import { prisma } from "../data/postgres";

import {
  permissions as permsData,
  dioceses as diocesesData,
  Redes as RedData,
  stages as stageData,
} from "./data";

const seederMain = async () => {
  await prisma.diocese.createMany({
    data: diocesesData,
    skipDuplicates: true,
  });
  await prisma.permission.createMany({
    data: permsData,
    skipDuplicates: true,
  });
  await prisma.social_media_category.createMany({
    data: RedData,
    skipDuplicates: true,
  });
  await prisma.stage.createMany({
    data: stageData,
    skipDuplicates: true,
  });
  console.log("Seeding completed");
};

seederMain().catch((error) => {
  throw error;
});
