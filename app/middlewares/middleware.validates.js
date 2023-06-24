import { validationResult } from "express-validator";

export const validateResults=(req,res,next)=>{
    try {
        validationResult(req).throw()
        next()
    } catch (error) {
        res.sendStatus(403)
        console.log(error);   
    }
}