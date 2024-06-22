import { Login, Login_Use, UserRepository } from "../../domain";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import "dotenv/config";
import { Compare } from "../services/hash_handler";

export class UserControler{
    constructor(private readonly repository: UserRepository){}

    public Login = (req: Request, res: Response) => { 
        const acces_promts = new Login(req.body.id, req.body.password);
        new Login_Use(this.repository)
            .execute(acces_promts)
            .then((user) => {
                if(user == undefined) {
                    res.json("Datos de acceso invalidos").send;
                }else{
                    const result = Compare(acces_promts.password, user.password as string);
                    if(!result) {
                        res.json("Contraseña invalida").send;
                    }else{
                        user.password = null;
                        const token = jwt.sign({ ...user }, process.env.SECRET as string, {expiresIn: '30m'})
                        res.header('auth',token).json(user).send;
                    }
                }
            }) 
            .catch((error) => res.status(400).json({ error }));
    };

}