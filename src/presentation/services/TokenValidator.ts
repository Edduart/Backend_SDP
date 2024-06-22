import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { BlackList, Blacklist_interface, DeleteExpiredTokens} from "../server";

export class ValidatorTo {
    public static ValidarToken(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['auth'];
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        
        jwt.verify(Token as string, process.env.SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access");
            }
            const result = BlackList.find((Blacklist_interface)=>Blacklist_interface.Token == Token);
            if(result == undefined) {
                return res.status(401).send("Invalid access");
            } 
            const data_json: { [key: string]: any } = decoded as { [key: string]: any };
            req.body.Permisos = data_json.Permisos;
            if(BlackList.length > 0){
                DeleteExpiredTokens();
            }
            next();
        });
    }
    public static ValidarTokenH(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['auth'];
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        jwt.verify(Token as string, process.env.SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access");
            }
            const result = BlackList.find((Blacklist_interface)=>Blacklist_interface.Token == Token);
            if(result == undefined) {
                return res.status(401).send("Invalid access");
            }
            const data_json: { [key: string]: any } = decoded as { [key: string]: any };
            req.headers['Permissions'] = data_json.Permisos;
            if(BlackList.length > 0){
                DeleteExpiredTokens();
            }
            next();
        });
    }
    public static Eliminate(req: Request, res: Response) {
        const Token = req.headers['auth'] as string;
        const enter: Blacklist_interface = {
            Token: Token,
            time: new Date()
        };
        BlackList.push(enter)
        res.json("Session terminated").send;
    }
}


