import express, { Router } from "express";
import cors from "cors";
//Debido a la necesidad de que el json de tokens este en todo el ambiente del server, se declara el blacklist en el server
export interface Blacklist_interface {
  Token: string;
  time: Date;
}
export var BlackList: Blacklist_interface[]=[];
export function DeleteExpiredTokens(){
  const horaactual = new Date();
  const horahace30minutos = new Date(horaactual.getTime() - 30 * 60 * 1000);

  BlackList = BlackList.filter(item => item.time >= horahace30minutos);

}
interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port , routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(cors());
    this.app.use("/images", express.static("images"));
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    //this.app.use( compression() )

    //* Routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

