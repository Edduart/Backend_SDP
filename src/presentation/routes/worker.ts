import { Router } from "express";
import { guardar } from "../services/upload.worker";
import fs from 'fs';
import path from 'path';




const router = Router();

router.post('/', guardar.single('file'),(req, res)=>{
    console.log(req)
    const origenpath = req.body.ayuda;
    let data = JSON.parse(req.body.data);
    console.log(data);
    const nuevopath =  path.join(path.dirname(origenpath), data.id + path.extname(origenpath))
    fs.rename(origenpath, nuevopath, err =>{
        if (err) {
            return res.status(500).send(err);
          }
        
    })
})


module.exports= router;