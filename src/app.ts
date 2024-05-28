import { envs } from "./config/envs";
//import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

import { dbConnectMySql } from "./config/db/db"

import { diocese } from "./domain/controllers/test"

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    //public_path: envs.PUBLIC_PATH,
    //routes: AppRoutes.routes,
  });

  diocese();

  server.start();
  dbConnectMySql();

}
