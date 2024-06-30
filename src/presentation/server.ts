import express, { Router } from "express";
import cors from "cors";
import { slowDown } from 'express-slow-down'
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // minutes
	limit: 15, // max 15 request per ip each passing menute
	standardHeaders: 'draft-7',
  statusCode: 429,
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})
const delayer = slowDown({
	windowMs: 1 * 60 * 1000, // 15 minutes
	delayAfter: 1, // Allow 5 requests per 1 minute.
	delayMs: (hits) => hits * 200, // Add 50 ms of delay after the first request
})

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
    //request limiter
    this.app.use(limiter);

    this.app.use(delayer);
    //* Routes 
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}