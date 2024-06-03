import { prisma } from "../data/postgres";
import { permissions as permsData, dioceses as diocesesData } from "./data";

//console.log(Object.keys(permsData));

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
      data: permsData,
    });
  }
  console.log("Seeding completed");
};

seederMain().catch((error) => {
  throw error;
});

