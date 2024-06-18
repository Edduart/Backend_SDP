import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class ValidatorTo {
    public static ValidarToken(req: Request, res: Response, next: NextFunction) {
        const Token = req.params.token;
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        jwt.verify(Token, "pollo", (error: any) => {
            if (error) {
                return res.status(401).send("Invalid access");
            }
            next();
        });
    }
}