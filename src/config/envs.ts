import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MINIMAL_GRADE: get("MIN_NOTA_APROBATORIA").required().asFloatPositive(),
  SERVER_ADDRESS: get("SERVER_ADDRESS").required().asString(),
};
