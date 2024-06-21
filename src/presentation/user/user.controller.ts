import { Login, Login_Use, UserRepository } from "../../domain";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';


export class UserControler{
    constructor(private readonly repository: UserRepository){}

    public Login = (req: Request, res: Response) => { 
        const acces_promts = new Login(req.body.id, req.body.password);
        new Login_Use(this.repository)
            .execute(acces_promts)
            .then((user) => {
                //Aaqui parece que sucede el error
                const token = jwt.sign({ ...user }, "pollo", {expiresIn: '5m'})
                res.header('auth',token).json(user).send;
            }) 
            .catch((error) => res.status(400).json({ error }));
    };

}