import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserEntity } from "../../domain";

export class ValidatorTo {
    public static ValidarToken(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['auth'];
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        jwt.verify(Token as string, "pollo", (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access");
            }
            
            const data_json: { [key: string]: any } = decoded as { [key: string]: any };
            req.body.Permisos = data_json.Permisos;
            console.log(req.body)
            next();
        });
    }
    public static ValidarTokenH(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['auth'];
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        jwt.verify(Token as string, "pollo", (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access");
            }
            
            const data_json: { [key: string]: any } = decoded as { [key: string]: any };
            req.headers['Permissions'] = data_json.Permisos;
            console.log(req.body)
            next();
        });
    }
}