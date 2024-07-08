import { modelData } from "./data/seederData";
import { modelPrismaData } from "./model/seederModel";

Object.values(modelData).forEach(model => {
  new modelPrismaData(model);
});
