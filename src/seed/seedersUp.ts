import { modelData } from "./data/seederData";
import { modelPrismaData } from "./model/seederModel";


Object.values(modelData).forEach(model => {
  new modelPrismaData(model);
});


//new modelPrismaData(modelData.diocese);



/*const seederMain = async () => {
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
});*/
