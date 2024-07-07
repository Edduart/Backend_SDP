import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { BlackList, Blacklist_interface, DeleteExpiredTokens} from "../server";

export class ValidatorTo {
    public static ValidarToken(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['auth'];
        //verifica que haya token
        if (!Token) {
            return res.status(401).send("Invalid access token not found");
        }
        //verifica que el token sea valido
        jwt.verify(Token as string, process.env.SECRET as string, (err, decoded) => {
            if (err) {
                //si es invalido manda error
                return res.status(401).send("Invalid access token not valid");
            }
            //si es valido busca si está en la blacklist
            const result = BlackList.find((Blacklist_interface)=>Blacklist_interface.Token == Token);
            if(result == undefined) {
                //si no esta en la black list procede a tomar los permisos y mandarlos en el body 
                const data_json: { [key: string]: any } = decoded as { [key: string]: any }; 
                //procedo a tomar el payload del token en el payload_basura
                const payload_basura = jwt.verify(Token as string, process.env.SECRET as string) as jwt.JwtPayload;
                const { iat, exp, ...playload } = payload_basura; //separo lo no necesario y lo tengo el el playload
                //creo el nuevo token
                const newToken = jwt.sign(playload, process.env.SECRET as string, {expiresIn: '30m'});
                //mando el nuevo token en la respuesta por el header 
                res.header('auth',newToken)
                //mando los permisos por el body
                req.body.Permisos = data_json.Permisos;
                if(BlackList.length > 0){
                    //luego si la lista no esta vacia llama a eliminar los token vencidos
                    DeleteExpiredTokens();
                }
                //paso a enviar el token viejo a la blacklist para que no pueda ser usado hasta que se expire
                const enter: Blacklist_interface = {
                    Token: Token as string,
                    time: new Date()
                };
                BlackList.push(enter);
               next();
            } else{
                //si esta en la blacklist se manda error
                return res.status(401).send("Invalid access token in black list");
            }
        });
        

    }
    public static ValidarTokenH(req: Request, res: Response, next: NextFunction) {
        const Token = req.headers['auth'];
        //verifica si existe el token, si no es invalido
        if (!Token) {
            return res.status(401).send("Invalid access");
        }
        //verifica si el token es valid
        jwt.verify(Token as string, process.env.SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).send("Invalid access");
            }
            //verifica si el token esta en la blakclist
            const result = BlackList.find((Blacklist_interface)=>Blacklist_interface.Token == Token);
            if(result == undefined) {
                const payload_basura = jwt.verify(Token as string, process.env.SECRET as string) as jwt.JwtPayload;
                const { iat, exp, ...playload } = payload_basura; //separo lo no necesario y lo tengo el el playload
                //creo el nuevo token
                const newToken = jwt.sign(playload, process.env.SECRET as string, {expiresIn: '30m'});
                //mando el nuevo token en la respuesta por el header 
                res.header('auth',newToken)
                //al no estar se decodifica el payload de permisos y se manda por headers
                const data_json: { [key: string]: any } = decoded as { [key: string]: any };
                req.headers['Permissions'] = data_json.Permisos;
                if(BlackList.length > 0){
                    DeleteExpiredTokens();
                }
                //paso a enviar el token viejo a la blacklist para que no pueda ser usado hasta que se expire
                const enter: Blacklist_interface = {
                    Token: Token as string,
                    time: new Date()
                };
                BlackList.push(enter);
                next();
            }else{
                return res.status(401).send("Invalid access");
            }
            
        });
    }
    public static Eliminate(req: Request, res: Response) {
        const Token = req.headers['auth'] as string;
        const enter: Blacklist_interface = {
            Token: Token,
            time: new Date()
        };
        BlackList.push(enter);
        res.json("Session terminated").send;
    }
}


