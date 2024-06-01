import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes/index";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
