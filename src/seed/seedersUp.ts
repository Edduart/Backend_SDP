import { prisma } from "../data/postgres";
import { permissions as permsData, dioceses as diocesesData, Redes as RedData } from "./data";


const seederMain = async () => {
  const checkDiocese = await prisma.diocese.findMany();
  if (checkDiocese.length === 0) {
    await prisma.diocese.createMany({
      data: diocesesData,
    });
  }
  const checkPerms = await prisma.permission.findMany();
  if (checkPerms.length === 0) {
    await prisma.permission.createMany({
      data: permsData
    });
  }
  const checkRed = await prisma.social_media_category.findMany();
  if(checkRed.length === 0){
    await prisma.social_media_category.createMany({
      data: RedData
    });
  }
  console.log("Seeding completed");
};

seederMain().catch((error) => {
  throw error;
});

