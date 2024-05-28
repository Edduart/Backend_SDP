import { v4 as uuidv4 } from "uuid";

//console.log(uuid());

export const getId = () => {
  return uuidv4();
};
