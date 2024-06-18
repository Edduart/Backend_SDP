import { Login, Login_Use, UserRepository } from "../../domain";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
export class UserControler{
    constructor(private readonly repository: UserRepository){}

    public Login= (req: Request, res: Response) => {
        
        const acces_promts = new Login(req.body.id, req.body.password);


        new Login_Use(this.repository)
            .execute(acces_promts)
            .then((user) => {
                //aca va to
                if(user.password != acces_promts.password) {
                    res.status(418).send("Contraseña incorrecta");
                }
                const token = jwt.sign(user, "pollo")
                res.json({token, user});
            }) 
            .catch((error) => res.status(400).json({ error }));
    };



}