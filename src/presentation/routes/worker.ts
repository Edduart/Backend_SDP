import { Router } from "express";
import { guardar } from "../services/upload.worker";




const router = Router();

router.post('/', guardar.single('file'),(req, res)=>{
    let data = JSON.parse(req.body.data);
})


module.exports= router;